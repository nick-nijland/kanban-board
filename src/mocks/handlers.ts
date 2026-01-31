import { http, HttpResponse } from 'msw';
import { Card, NewCard } from '../app/shared/models/card';

export let cards: Card[] = [
  {
    id: 4,
    title: 'Setup CI/CD',
    description:
      'Configure GitHub Actions for automated testing and deployment to staging environment.',
    status: 'DONE',
  },
  {
    id: 1,
    title: 'Test',
    description:
      'Set up the initial project structure and repository with README and basic folder organization.',
    status: 'TODO',
  },
  {
    id: 2,
    title: 'Implement Login',
    description:
      'Develop the login functionality with email/password authentication, including validation and error handling.',
    status: 'IN_PROGRESS',
  },
  {
    id: 3,
    title: 'Design Landing Page',
    description:
      'Create a responsive landing page layout using Figma designs. Include hero section, features, and footer.',
    status: 'TODO',
  },
  {
    id: 5,
    title: 'Write Unit Tests',
    description:
      'Add unit tests for authentication module using Jest. Ensure at least 80% coverage.',
    status: 'TODO',
  },
  {
    id: 6,
    title: 'Fix Navbar Bug',
    description: 'Resolve issue where the navigation bar overlaps content on mobile screens.',
    status: 'TODO',
  },
  {
    id: 7,
    title: 'Implement Dark Mode',
    description:
      'Add dark mode toggle for the application, store user preference in local storage.',
    status: 'IN_PROGRESS',
  },
  {
    id: 8,
    title: 'Optimize Images',
    description:
      'Compress and optimize all images to improve page load speed without losing quality.',
    status: 'TODO',
  },
  {
    id: 9,
    title: 'Update Dependencies',
    description: 'Update all npm packages to latest stable versions and test for breaking changes.',
    status: 'TODO',
  },
  {
    id: 10,
    title: 'Client Feedback Review',
    description:
      'Go through the client feedback document and create tickets for requested feature changes.',
    status: 'IN_PROGRESS',
  },
  {
    id: 11,
    title: 'Database Backup',
    description:
      'Schedule automated daily backups of production database and verify restore process.',
    status: 'DONE',
  },
  {
    id: 12,
    title: 'User Profile Page',
    description:
      'Design and implement the user profile page including editable fields, avatar upload, and password change.',
    status: 'TODO',
  },
  {
    id: 13,
    title: 'Bug Fix: Payment Gateway',
    description:
      'Investigate and fix errors occurring during payment processing for credit card transactions.',
    status: 'IN_PROGRESS',
  },
  {
    id: 14,
    title: 'Write Documentation',
    description:
      'Document API endpoints, authentication flow, and database schema for the development team.',
    status: 'TODO',
  },
  {
    id: 15,
    title: 'Deploy to Production',
    description:
      'Deploy the latest release to the production server and monitor logs for any errors.',
    status: 'TODO',
  },
];

export const handlers = [
  http.get('/api/tickets', () => {
    return HttpResponse.json<Card[]>(cards as Card[]);
  }),

  http.post('/api/tickets', async ({ request }) => {
    const newCard = (await request.json()) as NewCard;
    const card: Card = {
      title: newCard.title,
      description: newCard.description,
      status: 'TODO',
      id: cards.length > 0 ? Math.max(...cards.map((c) => c.id)) + 1 : 1, // Usually a BE will determine this, but for this assesment we're mocking.
    };
    cards.push(card);
    return HttpResponse.json<Card>(card, { status: 201 });
  }),

  http.put('/api/tickets/:id', async ({ request }) => {
    const updatedCard = (await request.json()) as Card;
    const url = new URL(request.url);
    const previousIndex = Number(url.searchParams.get('previousIndex'));
    const currentIndex = Number(url.searchParams.get('currentIndex'));

    if (url.searchParams.has('currentIndex')) {
      // first find out if moved from / to other status.
      const cardsWithStatus = cards.filter((card) => card.status === updatedCard.status);
      const cardIsInSameStatus = !!cardsWithStatus.find((card) => card.id === updatedCard.id);

      // if not, move updated car from cards.
      if (!cardIsInSameStatus) {
        cards = cards.filter((card) => card.id !== updatedCard.id);
        cardsWithStatus.splice(currentIndex, 0, updatedCard);
        cards.filter((card) => card.status !== updatedCard.status);
        cards = [...cards.filter((card) => card.status !== updatedCard.status), ...cardsWithStatus];

        return HttpResponse.json<Card>(updatedCard, { status: 200 });
      }

      const cardsWithOtherStatus = cards.filter((card) => card.status !== updatedCard.status);

      const updatedArray = [...cardsWithStatus];
      const [movedItem] = updatedArray.splice(previousIndex, 1);
      updatedArray.splice(currentIndex, 0, movedItem);

      cards = [...cardsWithOtherStatus, ...updatedArray];

      return HttpResponse.json<Card>(updatedCard, { status: 200 });
    }

    // if so, only update card's index.
    const index = cards.findIndex((card) => card.id === updatedCard.id);
    const existingCard = cards[index];

    if (existingCard.status === updatedCard.status) {
      cards[index] = updatedCard;
    } else {
      cards.splice(index, 1);
      cards.push(updatedCard);
    }

    return HttpResponse.json<Card>(updatedCard, { status: 200 });
  }),

  http.delete('/api/tickets/:id', ({ params }) => {
    const id = Number(params['id']);
    const index = cards.findIndex((card) => card.id === id);
    cards.splice(index, 1);
    return HttpResponse.json<Card>(undefined, { status: 201 });
  }),
];
