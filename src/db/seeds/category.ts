import { DBType } from "@/db";
import { category } from "@/db/schema";
import { CategorySchema } from "@/db/schema/category";

const mock: CategorySchema[] = [
	{
		name: "Node.js",
	},
	{
		name: "React",
	},
	{
		name: "Python",
	},
	{
		name: "Javascript",
	},
	{
		name: "Algorithms",
	},
	{
		name: "Devops",
	},
	{
		name: "APIs",
	},
];

export async function seed(db: DBType) {
	await db.insert(category).values(mock);
}
