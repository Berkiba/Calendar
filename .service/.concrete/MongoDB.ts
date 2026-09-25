import type IDatabase from "../../.interface/IDatabase.ts"

export default class MongoDB implements IDatabase<string, string> {
	Get(key: string) {
		return `Success invokation: Get(${key})`;
	}
	GetAll(key: string) {
		return [`Success invokation: Get(${key})`];
	}
	BatchGet(keys: string[]) {
		return [`Success invokation: Get(${keys[0]})`];
	}
	Put(key: string, data: string) {
		return;
	}
	BatchPut(keys: string[], datas: string[]) {
		return;
	}
}