const express = require('express');
const router = express.Router();

// Пример простого расчёта расхода сырья
// В реальной задаче можно расширить формулы и параметры

// POST /api/calc/raw-material
// В теле запроса ожидаем:
// {
//   productId: "id_продукта",
//   quantity: число,
//   size: { length: число, width: число, height: число } (опционально),
//   wastePercent: число (процент потерь, например 5)
// }
router.post('/raw-material', (req, res) => {
  try {
    const { productId, quantity, size, wastePercent } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Неверные параметры' });
    }

    // Здесь пример: считаем базовый расход сырья как volume * quantity
    // volume в условных единицах, если есть размеры
    let baseAmount = 1; // базовое количество на 1 шт, например, 1 условная единица

    if (size && size.length && size.width && size.height) {
      baseAmount = size.length * size.width * size.height;
    }

    let total = baseAmount * quantity;

    // Учитываем потери
    if (wastePercent && wastePercent > 0) {
      total *= (1 + wastePercent / 100);
    }

    // Округлим для удобства
    total = Math.round(total * 100) / 100;

    res.json({ productId, quantity, totalRawMaterial: total });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
