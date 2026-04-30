const productService = require('../services/productService');
const { successResponse, errorResponse } = require('../utils/response');

const productController = {
    index: async (req, res) => {
        try {
            const product = await productService.findAll();
            return successResponse(res, product, 'Berhasil ambil semua data produk.', 200);
        } catch (error) {
            return errorResponse(res, error.message, 500)
        }

    },
    show: async (req, res) => {
        try {
            const product = await productService.find(req.params.id);
            return successResponse(res, product, `Berhasil ambil data produk dengan id : ${req.params.id}.`, 200);
        } catch (error) {
            return errorResponse(res, error.message, 500)
        }
    },
    store: async (req, res) => {
        try {
            const { name, price, stock } = req.body;

            if (!name) {
                return errorResponse(res, 'Nama produk wajib diisi.', 422);
            }

            if (price === undefined || price === null || price === '') {
                return errorResponse(res, 'Harga produk wajib diisi.', 422);
            }

            if (stock === undefined || stock === null || stock === '') {
                return errorResponse(res, 'Stok produk wajib diisi.', 422);
            }

            const payload = {
                name,
                price,
                stock,
                created_at: new Date(),
                updated_at: new Date(),
            }

            const product = await productService.store(payload);
            return successResponse(res, product, `Berhasil tambah produk.`, 201);
        } catch (error) {
            return errorResponse(res, error.message, 500)
        }
    },
    update: async (req, res) => {
        try {
            const product = await productService.find(req.params.id);
            if (!product) errorResponse(res, "Produk tidak ditemukan.", 404)

            const { name, price, stock } = req.body;

            let payload = {};
            const currents = ['name', 'price', 'stock'];
            currents.forEach((current) => {
                if (req.body[current] !== undefined && req.body[current] != product[current]) {
                    payload[current] = req.body[current];
                }
            });

            if (Object.keys(payload).length === 0) {
                return successResponse(res, product, 'Tidak ada perubahan data.', 200);
            }

            payload.updated_at = new Date();

            const updateProduct = await productService.update(req.params.id, payload);

            return successResponse(res, updateProduct, `Berhasil update produk.`, 201);
        } catch (error) {
            return errorResponse(res, error.message, 500)
        }
    },
    destroy: async (req, res) => {
        try {
            const product = await productService.find(req.params.id);
            if (!product) errorResponse(res, "Produk tidak ditemukan.", 404)

            await productService.destroy(req.params.id);

            return successResponse(res, null, `Berhasil hapus produk.`, 201);
        } catch (error) {
            return errorResponse(res, error.message, 500)
        }
    }

}

module.exports = productController;