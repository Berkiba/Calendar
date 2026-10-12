import DataWebsiteVisitCounter from "./RepositoryDataWebsiteVisitCounter.ts";
import Account from "./RepositoryAccount.ts";

export class RepositoryManager {
	public website_visit_counter: DataWebsiteVisitCounter;
	public account: Account;
	constructor() {
		this.website_visit_counter = new DataWebsiteVisitCounter;
		this.account = new Account;
	}
} export default new RepositoryManager();