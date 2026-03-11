const accessoriesData = [
	{
		id: 1,
		name: "Mũ bảo hiểm Honda HJC",
		price: 1250000,
		colors: ["Red", "Black"],
		image: "helmet.jpg",
		type: "Safety",
	},
	{
		id: 2,
		name: "Bao tay lái cao cấp",
		price: 450000,
		colors: ["Gray", "Black"],
		image: "grips.jpg",
		type: "Comfort",
	},
];

const sparePartsData = [
	{
		id: 101,
		name: "Bugi NGK Iridium",
		price: 280000,
		partCode: "NGK-V2",
		category: "Engine",
		image: "sparkplug.jpg",
	},
	{
		id: 102,
		name: "Lọc gió Honda chính hãng",
		price: 150000,
		partCode: "AIR-H01",
		category: "Filters",
		image: "airfilter.jpg",
	},
];

export const ProductRepository = {
	getAccessoryById(id) {
		return accessoriesData.find((item) => item.id === parseInt(id));
	},
	getSparePartById(id) {
		return sparePartsData.find((item) => item.id === parseInt(id));
	},
};
