import { createService } from './factory';
import type { WebsiteContent } from '../types';

export const websiteContentService = createService<WebsiteContent>('website_content');
