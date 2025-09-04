import products from './models/product.ts';
import brands from './models/brand.ts';
import shipment from './models/shipment.ts';
import order from './models/order.ts';
import order_item from './models/cart_item.ts';
import return_item from './models/return_item.ts';
import payment from './models/payment.ts';
import promo from './models/promo.ts';
import customer from './models/customer.ts';
import cart from './models/cart.ts';
import cart_item from './models/cart_item.ts'
import category from './models/category.ts';
import address from './models/address.ts';
import product_sku from './models/product_sku.ts';
import product_image from './models/product_image.ts';
import review from './models/review.ts';
import { account, session, user, verification } from './models/auth-schema.ts';

const schema = {
	products,
	brands,
	shipment,
	order,
	order_item,
	return_item,
	payment,
	promo,
	customer,
	cart,
	cart_item,
	category,
	address,
	product_sku,
	product_image,
	review,
	user,
	session,
	account,
	verification,
}

export default schema;
