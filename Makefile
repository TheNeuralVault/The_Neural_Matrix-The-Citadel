PYTHON := python
BLOG_BUILD_SCRIPT := build_blog.py
INTEGRITY_SCRIPT := scripts/forge_integrity.py
SIGNAL_SCRIPT := scripts/forge_signal.py
THUMBNAIL_SCRIPT := scripts/forge_thumbnails.py
AUDIT_SCRIPT := scripts/forge_integrity.py

.PHONY: clean build audit deploy thumbnails integrity signal

clean:
	@echo "[CLEAN] Purging generated artifacts..."
	@rm -rf blog/posts
	@rm -f sitemap.xml
	@find . -name "*.pyc" -delete
	@find . -name "__pycache__" -type d -exec rm -rf {} +

build: thumbnails integrity signal
	@echo "[BUILD] Running blog compiler..."
	@$(PYTHON) $(BLOG_BUILD_SCRIPT)

integrity:
	@echo "[AUDIT] Running integrity forge..."
	@$(PYTHON) $(INTEGRITY_SCRIPT)

signal:
	@echo "[SIGNAL] Forging signal index and feed..."
	@$(PYTHON) $(SIGNAL_SCRIPT)

thumbnails:
	@echo "[VISUAL] Forging OG thumbnails..."
	@$(PYTHON) $(THUMBNAIL_SCRIPT)

audit:
	@echo "[AUDIT] Verifying Citadel Integrity..."
	@$(PYTHON) $(INTEGRITY_SCRIPT)

deploy: build audit
	@echo "[DEPLOY] Preparing git deployment..."
	@git add .
	@git commit -m "CITADEL DEPLOY: Reforged Static Stack via Makefile"
	@git push -u origin main
