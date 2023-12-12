// JavaScript xử lý các chức năng

// Mảng chứa danh sách các thẻ
let cards = [];

// Hàm validate dữ liệu
function validateCardData(cardNumber, expiryDate, cvv) {
    // Thực hiện kiểm tra dữ liệu đầu vào và trả về true hoặc false
    // Bạn cần thêm logic kiểm tra dữ liệu ở đây theo yêu cầu của đề bài
    return true; // Tạm thời trả về true cho mọi trường hợp
}

// Hàm lưu thông tin thẻ vào danh sách và hiển thị
function saveCard() {
    let cardNumber = document.getElementById("cardNumber").value;
    let expiryDate = document.getElementById("expiryDate").value;
    let cvv = document.getElementById("cvv").value;

    if (validateCardData(cardNumber, expiryDate, cvv)) {
        // Thêm thông tin thẻ vào mảng cards
        cards.push({
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
        });

        // Hiển thị danh sách thẻ
        displayCardList();
    } else {
        alert("Vui lòng kiểm tra lại thông tin thẻ!");
    }
}

// Hàm hiển thị danh sách thẻ
function displayCardList() {
    let tableBody = document
        .getElementById("cardList")
        .getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    cards.forEach(function(card, index) {
        let row = tableBody.insertRow();
        let cardNumberCell = row.insertCell(0);
        let expiryDateCell = row.insertCell(1);
        let cvvCell = row.insertCell(2);
        let actionsCell = row.insertCell(3);

        cardNumberCell.textContent = card.cardNumber.replace(
            /\d{6}(\d{6})/,
            "******$1"
        );
        expiryDateCell.textContent = card.expiryDate;
        cvvCell.textContent = card.cvv.replace(/\d/g, "*");

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteCard(index);
        };

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function() {
            editCard(index);
        };

        let viewButton = document.createElement("button");
        viewButton.textContent = "View";
        viewButton.onclick = function() {
            viewCard(index);
        };

        actionsCell.appendChild(deleteButton);
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(viewButton);
    });
}

// Hàm xóa thẻ từ danh sách
function deleteCard(index) {
    cards.splice(index, 1);
    displayCardList();
}

// Hàm chỉnh sửa thẻ
function editCard(index) {
    let card = cards[index];
    document.getElementById("cardNumber").value = card.cardNumber;
    document.getElementById("expiryDate").value = card.expiryDate;
    document.getElementById("cvv").value = card.cvv;

    document.getElementById("saveButton").onclick = function() {
        updateCard(index);
    };
}

// Hàm cập nhật thông tin thẻ đã chỉnh sửa
function updateCard(index) {
    let cardNumber = document.getElementById("cardNumber").value;
    let expiryDate = document.getElementById("expiryDate").value;
    let cvv = document.getElementById("cvv").value;

    if (validateCardData(cardNumber, expiryDate, cvv)) {
        cards[index] = {
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
        };
        displayCardList();
    } else {
        alert("Vui lòng kiểm tra lại thông tin thẻ!");
    }
}

// Hàm xem thông tin thẻ
function viewCard(index) {
    let card = cards[index];
    alert(
        "Card Number: " +
        card.cardNumber +
        "\nExpiry Date: " +
        card.expiryDate.replace(/(\d{2})(\d{4})/, "$1/$2") +
        "\nCVV: " +
        card.cvv
    );
}

document.getElementById("cardNumber").addEventListener("input", function() {
    var cardNumber = this.value.replace(/\D/g, ""); // Loại bỏ tất cả các ký tự không phải số
    if (cardNumber.length > 16) {
        cardNumber = cardNumber.slice(0, 16); // Nếu nhập quá 16 số thì chỉ lấy 16 số đầu tiên
    }
    this.value = cardNumber;
});

document.getElementById("cvv").addEventListener("input", function() {
    var cvv = this.value.replace(/\D/g, ""); // Loại bỏ tất cả các ký tự không phải số
    if (cvv.length > 3) {
        cvv = cvv.slice(0, 3); // Nếu nhập quá 3 số thì chỉ lấy 3 số đầu tiên
    }
    this.value = cvv;
});