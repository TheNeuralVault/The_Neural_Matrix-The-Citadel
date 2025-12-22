# ❖ CITADEL ROADMAP

## 🔴 PHASE 1: INITIALIZATION (Complete)
- [x] Architecture (HTML/CSS/JS)
- [x] Automation Scripts (Python)
- [x] Stripe Integration Logic

## 🟡 PHASE 2: POPULATION (Current Status)
- [ ] **Content:** Write 10 more deep-dive technical articles.
- [ ] **Inventory:** Expand Registry from 6 to 48 products.
- [ ] **Downloads:** Ensure every product in `registry.json` has a real `.zip` file in `public/downloads/`.

## 🟢 PHASE 3: AMPLIFICATION
- [ ] **SEO:** Submit sitemap to Google Console.
- [ ] **Traffic:** Launch Echo Marketer bot.
- [ ] **Community:** Activate Giscus comments.

## 🧠 HOW TO USE THIS REPO
1.  **Add Product:** Edit `config/registry.json` -> Run `python scripts/sync_stripe.py`.
2.  **Add Blog:** Add `.md` to `_content/` -> Run `python build_blog.py`.
3.  **Deploy:** `git add . && git commit -m "Update" && git push`.
