import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";


export const statment = {
	...defaultStatements,
	resource: ["", "", "", ""],
} as const;

export const ac = createAccessControl(statment);

export const admin = ac.newRole({
	resource: [],
	...adminAc.statements,
});

export const brand = ac.newRole({
	resource: [],
});

export const customer = ac.newRole({
	resource: [],
});
