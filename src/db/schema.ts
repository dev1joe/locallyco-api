import products from './models/product.ts';
import brands from './models/brand.ts';
import shipment from './models/shipment.ts';
import order from './models/order.ts';
import orderItem from './models/order_item.ts';
import returnItem from './models/return_item.ts';
import payment from './models/payment.ts';
import promo from './models/promo.ts';
import customer from './models/customer.ts';
import cart from './models/cart.ts';
import cartItem from './models/cart_item.ts'
import category from './models/category.ts';
import address from './models/address.ts';
import productSku from './models/product_sku.ts';
import productImage from './models/product_image.ts';
import review from './models/review.ts';
import { account, session, user, verification } from './models/auth-schema.ts';

const schema = {
	products,
	brands,
	shipment,
	order,
	orderItem,
	returnItem,
	payment,
	promo,
	customer,
	cart,
	cartItem,
	category,
	address,
	productSku,
	productImage,
	review,
	user,
	session,
	account,
	verification,
}

export default schema;
