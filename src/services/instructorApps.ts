import { createService } from './factory';
import type { InstructorApplication } from '../types';

export const instructorAppsService = createService<InstructorApplication>('instructor_applications');
