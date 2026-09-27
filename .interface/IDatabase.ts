export default interface IDatabase<K, D> {
	Get: (key: K) => D | undefined;
	GetAll: (key: K) => D[] | undefined;
	BatchGet: (keys: K[]) => D[] | undefined;
	Put: (key: K, data: D) => void;
	BatchPut: (keys: K[], datas: D[]) => void;
}