import DataWebsiteVisitCounter from "./RepositoryDataWebsiteVisitCounter.ts";
import Account from "./RepositoryAccount.ts";
import RepositoryEvent from "./RepositoryEvent.ts";

export class RepositoryManager {
	public website_visit_counter: DataWebsiteVisitCounter;
	public account: Account;
	//repository for calendar events
	public event: RepositoryEvent;
	constructor() {
		this.website_visit_counter = new DataWebsiteVisitCounter;
		this.account = new Account;

		//new repository for calendar events
		this.event = new RepositoryEvent();
	}
} export default new RepositoryManager();