// DATABASE
const databaseProduk = [
    { id: 1, kode: "KLB-BATIK-01", nama: "Dress Batik Parang", harga: "Rp 1.250.000", img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400" },
    { id: 2, kode: "KLB-KEBAYA-02", nama: "Kebaya Navy Modern", harga: "Rp 850.000", img: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?w=400" }
];

let selectedProduct = null;

// RENDER KATALOG
const grid = document.getElementById('productGrid');
databaseProduk.forEach(p => {
    grid.innerHTML += `
        <div class="card-item">
            <img src="${p.img}">
            <h4>${p.nama}</h4>
            <p style="color:var(--accent)">${p.harga}</p>
            <button class="btn-buy" onclick="openCheckout(${p.id})">PESAN SEKARANG</button>
        </div>
    `;
});

// FUNGSI VERIFIKASI
function cekKeaslian() {
    const code = document.getElementById('userInput').value.toUpperCase().trim();
    const result = databaseProduk.find(p => p.kode === code);
    
    document.querySelector('.input-group').style.display = 'none';
    document.getElementById('loader').style.display = 'block';

    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('resultArea').style.display = 'block';
        document.getElementById('btnUlang').style.display = 'inline-block';

        if(result) {
            selectedProduct = result;
            document.getElementById('titleResult').innerText = "PRODUK ORIGINAL";
            document.getElementById('prodNameVerify').innerText = result.nama;
            document.getElementById('prodImgVerify').src = result.img;
            document.getElementById('prodCard').style.display = 'flex';
        } else {
            document.getElementById('titleResult').innerText = "KODE TIDAK VALID";
        }
    }, 1200);
}

function ulang() {
    document.querySelector('.input-group').style.display = 'block';
    document.getElementById('resultArea').style.display = 'none';
    document.getElementById('btnUlang').style.display = 'none';
}

// CHECKOUT WA
function openCheckout(id) {
    selectedProduct = databaseProduk.find(p => p.id === id);
    document.getElementById('modalDetail').innerHTML = `<p>${selectedProduct.nama} - ${selectedProduct.harga}</p>`;
    document.getElementById('checkoutModal').style.display = 'block';
}

function closeModal() { document.getElementById('checkoutModal').style.display = 'none'; }

document.getElementById('orderForm').onsubmit = (e) => {
    e.preventDefault();
    const waLink = `https://wa.me/6281234567890?text=Halo, saya ${document.getElementById('custName').value} ingin pesan ${selectedProduct.nama}`;
    window.open(waLink, '_blank');
};

function toggleMenu() { document.getElementById('navMenu').classList.toggle('active'); }

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("SERTIFIKAT KEASLIAN", 10, 10);
    doc.text(`Produk: ${selectedProduct.nama}`, 10, 20);
    doc.save('Sertifikat-Klambi.pdf');
}
