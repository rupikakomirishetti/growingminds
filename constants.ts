import { Child, ActivityLog, ActivityType, MilestoneMetric } from './types';

export const MOCK_CHILDREN: Child[] = [
  {
    id: '1',
    firstName: 'Leo',
    lastName: 'Thompson',
    dateOfBirth: '2020-05-15',
    allergies: 'Peanuts',
    photoUrl: 'https://picsum.photos/200/200?random=1',
    group: 'Preschool A',
    email: 'thompson.parent@example.com',
    phoneNumber: '(555) 123-4567'
  },
  {
    id: '2',
    firstName: 'Mia',
    lastName: 'Thompson',
    dateOfBirth: '2022-08-20',
    allergies: 'None',
    photoUrl: 'https://picsum.photos/200/200?random=2',
    group: 'Toddlers B',
    email: 'thompson.parent@example.com',
    phoneNumber: '(555) 123-4567'
  }
];

export const MOCK_ACTIVITIES: ActivityLog[] = [
  {
    id: '101',
    childId: '1',
    type: ActivityType.CHECKIN,
    timestamp: new Date(new Date().setHours(8, 30)).toISOString(),
    description: 'Checked in by Dad',
  },
  {
    id: '102',
    childId: '1',
    type: ActivityType.PLAY,
    timestamp: new Date(new Date().setHours(9, 15)).toISOString(),
    description: 'Outdoor play',
    details: 'Playing with sand table',
    imageUrl: 'https://picsum.photos/600/400?random=10'
  },
  {
    id: '103',
    childId: '1',
    type: ActivityType.MEAL,
    timestamp: new Date(new Date().setHours(12, 0)).toISOString(),
    description: 'Lunch',
    details: 'Ate all chicken nuggets and broccoli',
  },
  {
    id: '104',
    childId: '1',
    type: ActivityType.NAP,
    timestamp: new Date(new Date().setHours(13, 0)).toISOString(),
    description: 'Nap time',
    details: 'Slept for 1.5 hours',
  },
   {
    id: '201',
    childId: '2',
    type: ActivityType.CHECKIN,
    timestamp: new Date(new Date().setHours(8, 35)).toISOString(),
    description: 'Checked in by Dad',
  },
  {
    id: '202',
    childId: '2',
    type: ActivityType.LEARNING,
    timestamp: new Date(new Date().setHours(10, 0)).toISOString(),
    description: 'Story time',
    details: 'Read "The Very Hungry Caterpillar"',
  }
];

export const MOCK_PROGRESS: MilestoneMetric[] = [
  { date: '2023-09-01', score: 65, category: 'Language' },
  { date: '2023-10-01', score: 70, category: 'Language' },
  { date: '2023-11-01', score: 75, category: 'Language' },
  { date: '2023-12-01', score: 78, category: 'Language' },
  { date: '2024-01-01', score: 82, category: 'Language' },
  { date: '2023-09-01', score: 60, category: 'Motor' },
  { date: '2023-10-01', score: 65, category: 'Motor' },
  { date: '2023-11-01', score: 70, category: 'Motor' },
  { date: '2023-12-01', score: 72, category: 'Motor' },
  { date: '2024-01-01', score: 75, category: 'Motor' },
];