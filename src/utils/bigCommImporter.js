import currentProcessModel from '../models/currentProcess.js';
import productModel from '../models/prductModel.js';
import { bigcommerceInstance } from '../services/request.js';

export const productImporter = async (user) => {
  let page = 1;
  await productModel.deleteMany({ user_id: user?.id });
  await currentProcessModel.create({
    process: 'product_import_process',
    user_id: user?.id,
    platform: 'bigcommerce'
  });
  const ps = setInterval(async () => {
    const url = `{store_hash}/v3/catalog/products?page=${page}&limit=5`;
    const { data } = await bigcommerceInstance.get(
      url?.replace('{store_hash}', user?.store_hash),
      {
        headers: {
          'X-Auth-Token': user?.access_token
        }
      }
    );
    const format = [];
    data?.data?.forEach(async (product) => {
      format.push({
        user_id: user?.id,
        sku: product?.sku,
        item_id: product?.id,
        item_name: product?.name,
        item: product
      });
    });
    await productModel.create(format);
    console.log('data?.meta?.pagination?.total_pages', data?.meta?.pagination?.total_pages);
    console.log('page', page);
    page++;
    if (data?.meta?.pagination?.total_pages < page) {
      clearInterval(ps);
      await currentProcessModel.deleteOne({ user_id: user?.id });
    }
  }, 1000 * 10);
};
