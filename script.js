const data = {"wax": [["การศึกษาประสิทธิผลของการใช้ขี้ผึ้งตำรับ ‘เสว่ฟู่จู๋ยวี’ ในการรักษาภาวะปวดชนิดเลือดคั่งตามศาสตร์การแพทย์แผนจีนในผู้สูงอายุ", "Huachiew Archiving System", "https://has.hcu.ac.th/jspui/handle/123456789/1938", "เปิดแหล่งข้อมูล"], ["การประเมินคุณภาพของขี้ผึ้งไทยเสริมสมุนไพร", "University of the Thai Chamber of Commerce", "https://scholar.utcc.ac.th/server/api/core/bitstreams/875bc3d3-0252-4832-a713-95a497e6608d/content", "เปิด PDF"], ["การศึกษาประสิทธิผลของการใช้ขี้ผึ้งตำรับ ‘เสว่ฟู่จู๋ยวี’ — ฉบับ PDF", "Huachiew Archiving System", "https://has.hcu.ac.th/jspui/bitstream/123456789/1938/1/Worapong-Paduka.pdf", "เปิด PDF"], ["การสร้างมูลค่าเพิ่มในผลิตภัณฑ์ครีมบำรุงผิวจากขี้ผึ้งและไขมะพร้าวรูปครีมสติ๊ก", "วารสารมนุษยศาสตร์และสังคมศาสตร์ มหาวิทยาลัยเอเชียอาคเนย์", "https://so05.tci-thaijo.org/index.php/saujournalssh/article/view/264892", "เปิดบทความ"], ["ประสิทธิภาพของแผ่นขี้ผึ้งปิดแผลเคลือบยาคลอร์เฮกซิดีนอะซีเตตต่อการป้องกันการติดเชื้อแบคทีเรีย", "HITAP", "https://db.hitap.net/articles/3394", "เปิดบทความ"]], "petrolatum": [["Petrolatum in Skincare: Friend or Foe for Your Skin Health?", "Clinikally", "https://www.clinikally.com/blogs/news/petrolatum-in-skincare-friend-or-foe-for-your-skin-barrier", "เปิดบทความ"], ["4 เหตุผล..ผู้หญิงพึงระวัง สวยด้วย ‘ปิโตรเลียมเจลลี่’", "ไทยโพสต์", "https://www.thaipost.net/main/detail/1017", "เปิดบทความ"], ["จุลินทรีย์กับความสามารถในการเพิ่มผลผลิตปิโตรเลียม", "มหาวิทยาลัยเชียงใหม่", "https://www.cmu.ac.th/th/article/e214b6e4-7770-4cf8-bd17-7d5e2c5283c9", "เปิดบทความ"], ["บริษัท ปตท.สำรวจและผลิตปิโตรเลียม จำกัด (มหาชน)", "MTEC / NSTDA", "https://www.mtec.or.th/stakeholders-perspective-pttep/", "เปิดบทความ"], ["เจาะลึก ‘ปิโตรเลียมเจล’ กับประโยชน์ด้านความงามสุดอเนกประสงค์", "Vogue Thailand", "https://vogue.co.th/beauty/article/petroleum-jelly", "เปิดบทความ"]], "coconut": [["ผลของการบริโภคน้ำมันมะพร้าวต่อไขมันในเลือด", "วารสารมหาวิทยาลัยคริสเตียน", "https://he01.tci-thaijo.org/index.php/CUTJ/article/view/155269", "เปิดบทความ"], ["ผลระยะสั้นของน้ำมันมะพร้าวสกัดเย็นต่อระดับไขมันในเลือดในผู้ป่วยที่ได้รับยาลดไขมันกลุ่มสเตติน", "Thai JPEN", "https://he02.tci-thaijo.org/index.php/ThaiJPEN/article/view/242057", "เปิดบทความ"], ["น้ำมันมะพร้าว (Coconut Oil) บำรุงผมและผิว รักษาแผล ให้ความชุ่มชื้น", "CosmeHerb / หน่วยงานภาครัฐ", "https://cosmeherb.nbt.or.th/herb_recommend/detail/7", "เปิดข้อมูล"], ["การยับยั้งอนุมูลอิสระและเอนไซม์เมทริกซ์เมทัลโลโปรติเนสของน้ำมันมะพร้าวบริสุทธิ์ และผลิตภัณฑ์ลดการอักเสบ", "วารสารวิจัยและส่งเสริมวิชาการเกษตร", "https://li01.tci-thaijo.org/index.php/MJUJN/article/view/214341", "เปิดบทความ"], ["เอกสารงานวิจัย: Enzymatic methods", "ARDA", "https://cads.arda.or.th/th/documents/research/dc852f8e-2d0c-4dda-9c1b-6da47e7216ab_th-TH?q=Enzymatic%20methods", "เปิดเอกสาร"]]};

const containers = {
  wax: document.getElementById("waxCards"),
  petrolatum: document.getElementById("petrolatumCards"),
  coconut: document.getElementById("coconutCards")
};

let activeFilter = "all";
let searchTerm = "";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[ch]));
}

function renderCards() {
  Object.entries(containers).forEach(([category, container]) => {
    container.innerHTML = "";
    if (activeFilter !== "all" && activeFilter !== category) return;

    data[category].forEach((item, index) => {
      const [title, source, url, buttonText] = item;
      const haystack = `${title} ${source} ${category}`.toLocaleLowerCase("th");
      if (searchTerm && !haystack.includes(searchTerm)) return;

      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="card-num">${index + 1}</div>
        <h3>${escapeHtml(title)}</h3>
        <p class="source"><strong>แหล่งข้อมูล:</strong> ${escapeHtml(source)}</p>
        <div class="card-actions">
          <a class="open-btn" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(buttonText)} ↗</a>
          <button class="copy-btn" type="button" title="คัดลอกลิงก์" aria-label="คัดลอกลิงก์" data-url="${escapeHtml(url)}">⧉</button>
        </div>`;
      container.appendChild(card);
    });
  });

  const visibleCards = document.querySelectorAll(".card").length;
  document.getElementById("noResults").hidden = visibleCards !== 0;
}

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderCards();
  });
});

const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

searchInput.addEventListener("input", e => {
  searchTerm = e.target.value.trim().toLocaleLowerCase("th");
  clearSearch.style.display = searchTerm ? "block" : "none";
  renderCards();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  searchTerm = "";
  clearSearch.style.display = "none";
  searchInput.focus();
  renderCards();
});

const toast = document.getElementById("toast");
let toastTimer;

document.addEventListener("click", async e => {
  const button = e.target.closest(".copy-btn");
  if (!button) return;

  const url = button.dataset.url;
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    const area = document.createElement("textarea");
    area.value = url;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
  clearTimeout(toastTimer);
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
});

const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 450);
}, {passive:true});

backTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

renderCards();
