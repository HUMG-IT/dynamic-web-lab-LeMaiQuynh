// Import các hàm calculateBMI và classifyBMI từ bmi.js

// Hàm getBMI xử lý yêu cầu từ client
// Trả về JSON chứa bmi và classification

// Xuất hàm getBMI

// Lưu ý: Tham khảo mã trong tệp nameController.js


const { calculateBMI, classifyBMI } = require('../models/bmi');

/**
 * Hàm xử lý yêu cầu tính BMI
 * 
 * Hàm này nhận thông tin chiều cao và cân nặng từ client, tính toán chỉ số BMI,
 * và phân loại chỉ số BMI trước khi trả về kết quả.
 * 
 * @param {Object} req - Đối tượng yêu cầu, chứa chiều cao và cân nặng.
 * @param {Object} res - Đối tượng phản hồi, để trả kết quả cho client.
 */
const getBMI = (req, res) => {
    const { height, weight } = req.body;

    // Kiểm tra nếu thiếu chiều cao hoặc cân nặng
    if (!height || !weight) {
        return res.status(400).json({ message: 'Chiều cao và cân nặng là bắt buộc.' });
    }

    // Tính BMI
    const bmi = calculateBMI(weight, height);
    const classification = classifyBMI(bmi);

    // Trả về kết quả
    return res.status(200).json({
        bmi: bmi,
        classification: classification
    });
};

module.exports = { getBMI };
