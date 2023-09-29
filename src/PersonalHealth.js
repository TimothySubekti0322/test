// Import Flatpickr from the installed package
// import flatpickr from "flatpickr";

// Initialize Flatpickr on the input element with the id "datepicker"
// flatpickr("#datepicker", {
//   dateFormat: "Y-m-d", // Format tanggal yang diinginkan
//   // Opsi tambahan bisa ditambahkan di sini
// });

// const dateStringInput = document.querySelectorAll("#date-string");
// const dateStringValue = document.querySelectorAll("#date-string-value");

// dateStringInput.value = "2021-03-31";
// dateStringValue.textContent = dateStringInput.value;

// dateStringInput.addEventListener("input", () => {
//   dateStringValue.textContent = dateStringInput.value;
// });

// Get the modal and the container
const myModal = document.getElementById("my_modal_4");
const container = document.getElementById("container");

// Get the "Choose" and "Cancel" buttons by their IDs
const chooseButton = document.querySelector("button#chooseButton");
const cancelButton = document.querySelector("button#cancelButton");

// Add an event listener to the "Choose" button
chooseButton.addEventListener("click", function () {
  console.log("Choose button clicked!");
  // Check if the selected option is "Glukosamin"
  const measurementIndicator = document.querySelector(
    "select#measurementIndicator"
  );
  if (measurementIndicator.value === "glukosamin") {
    // Create the "Kolesterol" section
    const kolesterolSection = document.createElement("div");
    kolesterolSection.classList.add(
      "flex",
      "flex-col",
      "px-2",
      "bg-[#EAF3F5]",
      "rounded-2xl",
      "gap-y-0.5"
    );

    // Customize the content of the "Kolesterol" section
    kolesterolSection.innerHTML = `
      <!-- Layer 1 -->
      <div class="flex flex-row items-center justify-between h-16">
        <div class="flex flex-row items-center mt-2">
          <img src="../public/assets/Icon/Drop of Blood.png" class="object-scale-down w-12 h-16" />
          <h2 class="font-bold">Kolestrol</h2>
        </div>
        <img src="../public/assets/Icon/Close.png" class="object-scale-down w-16 h-16" />
      </div>

      <!-- Layer 2 -->
      <div class="flex flex-row items-center justify-between h-8">
        <p class="px-5 text-xs">Nilai</p>
        <input type="text" placeholder="0" class="w-12 h-8 max-w-xs input input-bordered" />
      </div>

      <!-- Layer 3 -->
      <div class="flex flex-row items-center justify-between h-8 mt-2">
        <p class="px-5 text-xs">Satuan</p>
        <!-- Dropdown -->
        <div>
          <select
            id="kolesterolUnit"
            class="block w-[10 rem] px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="kolesterol" class="text-s">mg/dl</option>
            <!-- Add other measurement unit options as needed -->
          </select>
        </div>
      </div>

      <!-- Layer 4 -->
      <div class="flex flex-row items-center mt-2 gap-x-[0.125rem] h-8 mb-2">
        <img src="../public/assets/Icon/Clock.png" class="object-scale-down w-16 h-16" />
        <p class="text-xs">3:19 PM</p>
      </div>
    `;

    // Append the "Kolesterol" section to the container
    container.appendChild(kolesterolSection);
  }

  // Close the modal
  myModal.close();
});

// Add an event listener to the "Cancel" button to close the modal
cancelButton.addEventListener("click", function () {
  myModal.close();
});

// Menunggu hingga elemen iframe selesai dimuat
const containerFrame = document.getElementById("container-frame");

containerFrame.addEventListener("load", function () {
  // Menginisialisasi elemen riwayat baru setelah iframe selesai dimuat
  initializeContainer();
});

function initializeContainer() {
  const containerDocument = containerFrame.contentDocument;

  // Pastikan iframe sudah dimuat
  if (containerDocument) {
    const container = containerDocument.getElementById("container");

    // Lanjutkan dengan menambahkan elemen baru ke dalam container
    if (container) {
      // Tambahkan elemen baru ke dalam container
      container.appendChild(newRiwayat);
    } else {
      console.error("Element with ID 'container' not found in iframe.");
    }
  } else {
    console.error("Iframe contentDocument not available.");
  }
}

// Menambahkan event listener ke tombol "Simpan Pengukuran"
const simpanPengukuranButton = document.getElementById("simpanPengukuran");
simpanPengukuranButton.addEventListener("click", function () {
  // Membuat elemen riwayat pengukuran baru
  const newRiwayat = document.createElement("div");
  newRiwayat.classList.add(
    "bg-[#EAF3F5]",
    "rounded-lg",
    "flex",
    "flex-row",
    "px-2",
    "justify-around",
    "items-center",
    "riwayat-percakapan"
  );

  // Mendapatkan tanggal dan waktu saat ini
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "default",
    { month: "long" }
  )} ${currentDate.getFullYear()}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;

  // Menambahkan isi riwayat pengukuran
  newRiwayat.innerHTML = `
    <img src="../public/assets/Icon/Report File.png" alt="" class="object-scale-down w-6 h-6" />
    <p class="pl-4 font-bold text-s">${formattedDate}</p>
    <!-- Open the modal using ID.showModal() method -->
    <button class="bg-[#EAF3F5] px-0 mx-0 rounded-lg btn" onclick="showDeleteConfirmation(this)">
      <img src="../public/assets/Icon/Close.png" alt="" class="object-scale-down w-12 h-12" />
    </button>

    <!-- Modal Konfirmasi Hapus -->
    <dialog class="modal" data-delete-target="riwayat-percakapan">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Konfirmasi Hapus</h3>
        <p class="py-4">Apakah Anda yakin ingin menghapus riwayat ini?</p>
        <div class="modal-action">
          <button class="font-bold text-white bg-red-500 rounded-lg btn" onclick="confirmDelete(this)">Hapus</button>
          <button class="btn" onclick="cancelDelete(this)">Batal</button>
        </div>
      </div>
    </dialog>
  `;

  // Menambahkan elemen riwayat baru ke dalam elemen dengan ID "container" pada halaman riwayatPersonalHealth.html
  const containerFrame = document.getElementById("container-frame");
  containerFrame.contentDocument
    .getElementById("container")
    .appendChild(newRiwayat);
});
