import RepositoryDataWebsiteVisitCounter from "./RepositoryDataWebsiteVisitCounter.ts";

export class RepositoryManager {
	public website_visit_counter: RepositoryDataWebsiteVisitCounter;
	constructor() {
		this.website_visit_counter = new RepositoryDataWebsiteVisitCounter;
	}
} export default new RepositoryManager();