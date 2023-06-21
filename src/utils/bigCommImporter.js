import currentProcessModel from '../models/currentProcess.js';
import productModel from '../models/prductModel.js';
import { bigComGetCall } from '../services/request.js';

export const productImporter = async (user) => {
  let page = 1;
  await productModel.deleteMany({ user_id: user?.id });
  await currentProcessModel.create({
    process: 'product_import_process',
    user_id: user?.id,
    platform: 'bigcommerce'
  });
  const ps = setInterval(async () => {
    const res = await bigComGetCall({
      access_token: user?.access_token,
      url: `stores/${user?.store_hash}/v3/catalog/products?page=${page}&limit=5`
    });
    console.log('res', res?.data);
    const format = [];
    res?.data?.data?.forEach(async (product) => {
      format.push({
        user_id: user?.id,
        sku: product?.sku,
        source_product_id: product?.id,
        product_name: product?.name,
        product
      });
    });
    await productModel.create(format);
    console.log('total_pages', res?.data?.meta?.pagination?.total_pages);
    console.log('current_page', page);
    page++;
    if (res?.data?.meta?.pagination?.total_pages < page) {
      clearInterval(ps);
      await currentProcessModel.deleteOne({ user_id: user?.id });
    }
  }, 1000 * 10);
};
