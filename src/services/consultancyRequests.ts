import { createService } from './factory';
import type { ConsultancyRequest } from '../types';

export const consultancyRequestsService = createService<ConsultancyRequest>('consultancy_requests');
