# Parafilm Rebrand Specification

This document describes every change needed to rebrand from Ente to Parafilm.
Use it to build an automated workflow that re-applies branding after upstream syncs.

---

## 1. BRAND ASSETS (new files to copy)

```
assets/branding/logo__black.svg      → Parafilm wordmark (black, for light bg)
assets/branding/logo_white.svg       → Parafilm wordmark (white, for dark bg)
assets/branding/parafilm_favi.svg    → Parafilm favicon/icon (red circle + "p")
```

### Generated from parafilm_favi.svg:

| Target | Size | Tool |
|--------|------|------|
| `web/apps/*/public/images/favicon.png` (11 apps) | 256x256 | cairosvg |
| `web/apps/memories/public/favicon.ico` | multi-size ICO | Pillow |
| `desktop/build/icon.png` | 512x512 | cairosvg |
| `desktop/build/window-icon.png` | 256x256 | cairosvg |
| `desktop/build/taskbar-icon.png` | 16x16 | cairosvg |
| `desktop/build/taskbar-icon@2x.png` | 32x32 | cairosvg |
| `desktop/build/taskbar-icon@3x.png` | 48x48 | cairosvg |
| `desktop/build/taskbar-icon-Template.png` | 16x16 | cairosvg |
| `desktop/build/taskbar-icon-Template@2x.png` | 32x32 | cairosvg |
| `desktop/build/taskbar-icon-Template@3x.png` | 48x48 | cairosvg |
| `mobile/apps/{photos,auth,locker}/android/app/src/main/res/mipmap-mdpi/ic_launcher.png` | 48x48 | cairosvg |
| `mobile/apps/{photos,auth,locker}/android/app/src/main/res/mipmap-hdpi/ic_launcher.png` | 72x72 | cairosvg |
| `mobile/apps/{photos,auth,locker}/android/app/src/main/res/mipmap-xhdpi/ic_launcher.png` | 96x96 | cairosvg |
| `mobile/apps/{photos,auth,locker}/android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png` | 144x144 | cairosvg |
| `mobile/apps/{photos,auth,locker}/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` | 192x192 | cairosvg |
| `mobile/apps/locker/ios/Runner/Assets.xcassets/AppIcon.appiconset/*.png` | match original size | cairosvg |
| `web/apps/paste/public/images/pastelogo.png` | 400x79 (from logo__black.svg) | cairosvg |

---

## 2. TEXT REPLACEMENTS (sed-style)

### Rule: Replace user-visible "Ente" brand names only

**DO NOT replace:**
- Package IDs: `io.ente.photos`, `io.ente.auth`, `io.ente.locker`
- Import paths: `github.com/ente-io/...`
- URL domains: `ente.com`, `ente.io`, `email-assets.ente.com`
- Email addresses: `team@ente.com`, `support@ente.com`
- Code identifiers: `EnteColorScheme`, `EnteFile`, variable names
- URL protocol schemes: `ente://`
- Keyring service names
- API paths and HTTP headers

### 2.1 App Names

| Old | New | Where |
|-----|-----|-------|
| `Ente Photos` | `Parafilm Photos` | strings.xml, play store, iOS Info.plist, desktop menu, tray tooltip |
| `Ente Auth` | `Parafilm Auth` | strings.xml, play store, iOS plist, Linux packaging, macOS, Windows |
| `Ente Locker` | `Parafilm Locker` | AndroidManifest, iOS Info.plist, web manifest, pubspec |
| `Ente Debug` | `Parafilm Debug` | strings.xml (debug flavor) |
| `Ente Dev` | `Parafilm Dev` | strings.xml (dev flavor) |
| `Ente Technologies, Inc.` | `Parafilm Technologies, Inc.` | email template footers |
| `Team Ente` / `The Ente Team` | `Team Parafilm` / `The Parafilm Team` | email templates |
| `Ente Friends` | `Parafilm Friends` | discount coupon emails |

### 2.2 Specific Files - Server Go Code

| File | What to replace |
|------|----------------|
| `server/ente/billing.go` | Email subjects containing "Ente" |
| `server/pkg/controller/email/storage_warning.go` | From name "Ente" |
| `server/pkg/controller/email/storage_warning_expired.go` | Email subjects |
| `server/pkg/controller/email/storage_warning_overage.go` | Email subjects |
| `server/pkg/controller/email/email_notification.go` | From name |
| `server/pkg/controller/discountcoupon/controller.go` | Email subjects, from name |
| `server/pkg/controller/legacy_kit/email.go` | From name |
| `server/pkg/controller/offer/offer.go` | From name |
| `server/pkg/controller/family/admin.go` | From name |
| `server/pkg/controller/playstore.go` | From name |
| `server/pkg/controller/stripe.go` | From name |
| `server/pkg/controller/user/user.go` | TOTP issuer org, from name |
| `server/pkg/controller/user/userauth.go` | From name |
| `server/pkg/controller/user/inactive_user_orchestrator.go` | Email text |
| `server/pkg/controller/user/storage_warning_login_grace.go` | Email text |
| `server/pkg/controller/emergency/email.go` | From name |
| `server/pkg/repo/passkey/passkey.go` | WebAuthn RP display name |
| `server/config/example.yaml` | Comments |
| `server/configurations/local.yaml` | Comments |

### 2.3 Specific Files - Email Templates (HTML)

All files in `server/mail-templates/` and `server/web-templates/`:
- `title="Ente"` → `title="Parafilm"`
- `alt="Ente"` → `alt="Parafilm"`
- `Ente Technologies, Inc.` → `Parafilm Technologies, Inc.`
- Body text: "your Ente account", "Ente Photos", "Ente Locker", "CEO of Ente", "Team Ente", "The Ente Team", "Ente Friends", "the Ente app", "Ente community", "on Ente", "trying Ente", etc.

**Full list of email template files (50+):**
```
server/mail-templates/account_deleted.html
server/mail-templates/account_deleted_active_sub.html
server/mail-templates/base.html
server/mail-templates/bf_2024.html
server/mail-templates/customer_hello.html
server/mail-templates/discount_coupon.html
server/mail-templates/discount_coupon_kagi.html
server/mail-templates/discount_coupon_notesnook.html
server/mail-templates/discount_coupon_test.html
server/mail-templates/discount_coupon_tuta.html
server/mail-templates/discount_coupon_windscribe.html
server/mail-templates/email_changed.html
server/mail-templates/ente_base.html
server/mail-templates/family_accepted.html
server/mail-templates/family_invited.html
server/mail-templates/family_left.html
server/mail-templates/family_nudge.html
server/mail-templates/family_removed.html
server/mail-templates/files_collected.html
server/mail-templates/inactive-user-deletion/confirm_13m.html
server/mail-templates/inactive-user-deletion/warn_1d.html
server/mail-templates/inactive-user-deletion/warn_1m.html
server/mail-templates/inactive-user-deletion/warn_2m.html
server/mail-templates/inactive-user-deletion/warn_7d.html
server/mail-templates/legacy/kit_recovery_started.html
server/mail-templates/legacy/legacy_base.html
server/mail-templates/legacy/legacy_invite.html
server/mail-templates/legacy/legacy_invite_sent.html
server/mail-templates/legacy/recovery_completed_trusted.html
server/mail-templates/legacy/recovery_ready_trusted.html
server/mail-templates/legacy/recovery_reminder.html
server/mail-templates/legacy/recovery_started.html
server/mail-templates/mobile_app_first_upload.html
server/mail-templates/on_hold.html
server/mail-templates/on_link_joined.html
server/mail-templates/on_login.html
server/mail-templates/ott.html
server/mail-templates/ott_change_email.html
server/mail-templates/ott_mobile.html
server/mail-templates/storage-warning/storage_warning_active_overage.html
server/mail-templates/storage-warning/storage_warning_active_overage_scheduled_deletion.html
server/mail-templates/storage-warning/storage_warning_expired.html
server/mail-templates/storage-warning/storage_warning_expired_scheduled_deletion.html
server/mail-templates/storage-warning/storage_warning_login_grace.html
server/mail-templates/storage_limit_exceeded.html
server/mail-templates/subscription_cancelled.html
server/mail-templates/subscription_ended.html
server/mail-templates/subscription_upgraded.html
server/mail-templates/successful_referral.html
server/mail-templates/web_app_first_upload.html
server/web-templates/account_recovered.html
server/web-templates/account_recovery_error.html
```

### 2.4 Specific Files - CLI

| File | What |
|------|------|
| `cli/cmd/root.go` | Help text "from Ente" → "from Parafilm" |
| `cli/internal/api/admin.go` | Test mail subject/body |

### 2.5 Specific Files - Desktop

| File | What |
|------|------|
| `desktop/package.json` | description, author, productName |
| `desktop/electron-builder.yml` | protocol name, publisherName |
| `desktop/build/io.ente.photos.appdata.xml` | app name, developer name, description |
| `desktop/src/main.ts` | Tray tooltip |
| `desktop/src/main/menu.ts` | All menu labels: "About Ente", "Hide Ente", "Ente Help", "Open Ente", "Quit Ente" |

### 2.6 Specific Files - Mobile Photos

| File | What |
|------|------|
| `mobile/apps/photos/android/app/src/main/res/values/strings.xml` | "Ente Photos" |
| `mobile/apps/photos/android/app/src/debug/res/values/strings.xml` | "Ente Debug" |
| `mobile/apps/photos/android/app/src/dev/res/values/strings.xml` | "Ente Dev" |
| `mobile/apps/photos/android/app/src/main/play/listings/en-US/title.txt` | "Ente Photos" |
| `mobile/apps/photos/android/app/src/main/play/listings/en-US/short-description.txt` | Play store text |
| `mobile/apps/photos/android/app/src/main/play/listings/en-US/full-description.txt` | Play store text (5 occurrences) |
| `mobile/apps/photos/lib/l10n/intl_en.arb` | ~34 user-visible strings |
| `mobile/apps/photos/lib/ui/map/tile/layers.dart` | User-Agent string |
| `mobile/apps/photos/ios/Runner.xcodeproj/project.pbxproj` | CFBundleDisplayName |

### 2.7 Specific Files - Mobile Auth

| File | What |
|------|------|
| `mobile/apps/auth/android/app/src/main/AndroidManifest.xml` | android:label |
| `mobile/apps/auth/android/app/src/main/play/listings/en-US/title.txt` | "Ente Auth" |
| `mobile/apps/auth/android/app/src/main/play/listings/en-US/full-description.txt` | Play store text |
| `mobile/apps/auth/ios/Runner/Info.plist` | CFBundleDisplayName |
| `mobile/apps/auth/ios/Runner.xcodeproj/project.pbxproj` | CFBundleDisplayName (5x) |
| `mobile/apps/auth/macos/Runner.xcodeproj/project.pbxproj` | product path |
| `mobile/apps/auth/macos/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme` | BuildableName |
| `mobile/apps/auth/macos/Runner/Configs/AppInfo.xcconfig` | Product name |
| `mobile/apps/auth/macos/packaging/dmg/make_config.yaml` | app path |
| `mobile/apps/auth/windows/runner/Runner.rc` | Window title |
| `mobile/apps/auth/windows/runner/main.cpp` | Window title |
| `mobile/apps/auth/windows/packaging/exe/make_config.yaml` | install_dir_name |
| `mobile/apps/auth/scripts/build_windows_installer.ps1` | AppName, DefaultDirName, Icons, Run labels |
| `mobile/apps/auth/linux/my_application.cc` | GTK window title |
| `mobile/apps/auth/linux/packaging/appimage/make_config.yaml` | display_name, generic_name |
| `mobile/apps/auth/linux/packaging/deb/make_config.yaml` | display_name, maintainer, generic_name |
| `mobile/apps/auth/linux/packaging/pacman/make_config.yaml` | display_name, maintainer, generic_name |
| `mobile/apps/auth/linux/packaging/rpm/make_config.yaml` | vendor, packager, generic_name |
| `mobile/apps/auth/linux/packaging/enteauth.desktop` | GenericName |
| `mobile/apps/auth/linux/packaging/enteauth.appdata.xml` | name, developer name |
| `mobile/apps/auth/linux/packaging/build_rpm.sh` | echo, vendor, maintainer |
| `mobile/apps/auth/assets/polkit/io.ente.auth.policy` | vendor, description, message |
| `mobile/apps/auth/lib/l10n/arb/app_*.arb` | All 42 locale files |
| `mobile/apps/auth/lib/ui/settings/data/html_export.dart` | HTML export heading |
| `mobile/apps/auth/lib/ui/settings/data/import/encrypted_ente_import.dart` | Dialog title |
| `mobile/apps/auth/lib/ui/components/auth_qr_dialog.dart` | Comment |
| `mobile/apps/auth/android/app/src/main/kotlin/io/ente/authenticator/QuickTileService.kt` | Tile label |

### 2.8 Specific Files - Mobile Locker

| File | What |
|------|------|
| `mobile/apps/locker/android/app/src/main/AndroidManifest.xml` | android:label |
| `mobile/apps/locker/android/app/src/main/play/listings/en-US/title.txt` | "Ente Locker" |
| `mobile/apps/locker/android/app/src/main/play/listings/en-US/full-description.txt` | Play store text |
| `mobile/apps/locker/ios/Runner/Info.plist` | CFBundleDisplayName, CFBundleName |
| `mobile/apps/locker/web/manifest.json` | name, short_name |
| `mobile/apps/locker/web/index.html` | apple-mobile-web-app-title, title |
| `mobile/apps/locker/pubspec.yaml` | description |
| `mobile/apps/locker/lib/l10n/app_en.arb` | English strings |
| `mobile/apps/locker/lib/l10n/app_cs.arb` | Czech |
| `mobile/apps/locker/lib/l10n/app_fr.arb` | French |
| `mobile/apps/locker/lib/l10n/app_ru.arb` | Russian |
| `mobile/apps/locker/lib/l10n/app_vi.arb` | Vietnamese |

### 2.9 Specific Files - Web Apps

| File | What |
|------|------|
| `web/packages/base/components/ente-wordmark.ts` | **FULL REPLACE** - SVG paths with Parafilm logo |
| `web/packages/base/components/EnteLogo.tsx` | **FULL REPLACE** - Updated component with rect+circle |
| `web/packages/base/components/Head.tsx` | Page title |
| `web/packages/base/components/utils/theme.ts` | Theme colors |
| `web/packages/base/app.ts` | App name |
| `web/packages/base/locales/*/translation.json` | All 30 locale files |
| `web/packages/contacts/legacy/components/LegacyAddContactContent.tsx` | UI text |
| `web/packages/new/photos/services/export.ts` | Export text |
| `web/apps/photos/src/pages/index.tsx` | Page content |
| `web/apps/auth/src/pages/share.tsx` | Page content |
| `web/apps/cast/src/pages/index.tsx` | Page content |
| `web/apps/embed/src/pages/_app.tsx` | App title |
| `web/apps/embed/src/components/EmbedFileListWithViewer.tsx` | UI text |
| `web/apps/ensu/src/pages/chat.tsx` | UI text |
| `web/apps/legacy/src/pages/index.tsx` | Page content |
| `web/apps/locker/src/components/LockerHead.tsx` | Page title |
| `web/apps/locker/src/locales/*/translation.json` | 3 locale files |
| `web/apps/memories/src/pages/_app.tsx` | App title |
| `web/apps/memories/src/components/*.tsx` | UI text |
| `web/apps/paste/src/pages/_app.tsx` | App title |
| `web/apps/paste/src/features/paste/components/PasteHero.tsx` | Hero text |
| `web/apps/paste/src/features/paste/components/PasteFrame.tsx` | UI text |
| `web/apps/paste/src/features/paste/components/PasteFooter.tsx` | Footer text |
| `web/apps/paste/src/features/paste/components/PasteViewPanel.tsx` | UI text |
| `web/apps/share/src/pages/index.tsx` | Page text |
| `web/apps/share/src/components/file-share/FileShareView.tsx` | UI text |
| `web/apps/share/src/components/file-share/PublicShareScaffold.tsx` | UI text |
| `web/apps/twoof3/src/pages/_app.tsx` | App title |
| `web/apps/twoof3/src/pages/index.tsx` | Page text |
| `web/apps/albums/src/public-album/access/utils/external-links.ts` | External links text |
| `web/apps/albums/src/public-album/viewer/lib/photoswipe.ts` | Uses wordmark (auto-updated via import) |

---

## 3. COLOR REPLACEMENTS

### 3.1 Photos App Colors (`mobile/apps/photos/lib/theme/colors.dart`)

| Old (Ente Green) | New (Parafilm) | Name |
|------------------|----------------|------|
| `#1DB954` / `Color.fromRGBO(29, 185, 84, 1)` | `#f75757` / `Color.fromRGBO(247, 87, 87, 1)` | Primary 500 |
| `#00B33C` / `Color.fromRGBO(0, 179, 60, 1)` | `#D94545` / `Color.fromRGBO(217, 69, 69, 1)` | Primary 700 |
| `#26CB5F` / `Color.fromRGBO(38, 203, 95, 1)` | `#F96B6B` / `Color.fromRGBO(249, 107, 107, 1)` | Primary 400 |
| `#01DE4D` / `Color.fromRGBO(1, 222, 77, 1)` | `#FB8E8E` / `Color.fromRGBO(251, 142, 142, 1)` | Primary 300 |
| `#08C225` / `Color.fromRGBO(8, 194, 37, 1)` | `#f75757` / `Color.fromRGBO(247, 87, 87, 1)` | Green/Success |
| `#069D1E` / `Color.fromRGBO(6, 157, 30, 1)` | `#D94545` / `Color.fromRGBO(217, 69, 69, 1)` | Green Dark |
| `#057C18` / `Color.fromRGBO(5, 124, 24, 1)` | `#B83A3A` / `Color.fromRGBO(184, 58, 58, 1)` | Green Darker |
| `#F4F4F4` (background light) | `#FAFAFA` | Off White |
| `#161616` (background dark) | `#1D1F2F` | Charcoal Blue |

### 3.2 Photos Android (`mobile/apps/photos/android/app/src/main/res/values/colors.xml`)

| Old | New |
|-----|-----|
| `#08C225` (ic_launcher_background) | `#f75757` |

### 3.3 Auth App Colors (`mobile/apps/auth/lib/theme/colors.dart`)

| Old (Ente Purple) | New (Champagne Gold) | Name |
|-------------------|----------------------|------|
| `#8F33D6` | `#E6C79C` | Accent |
| `#722ED1` | `#C9A87C` | Primary 700 |
| `#7A29C1` | `#D4B48A` | Primary 400 |
| `#984DF4` | `#EDD5B5` | Primary 300 |
| `#130D1B` | `#1D1F2F` | Dark background |
| `#8232E1` | `#E6C79C` | Icon button light |
| `#722ED1` (tag chip selected) | `#C9A87C` | Tag selected |
| `#B37FEB` (gradient start) | `#EDD5B5` | Tag gradient start |
| `#AE40E3` (gradient end) | `#E6C79C` | Tag gradient end |
| `#FCF5FF` (unselected light) | `#FFF8F0` | Tag unselected light |
| `#1C0F22` (unselected dark) | `#1D1F2F` | Tag unselected dark |

### 3.4 Auth Android (`mobile/apps/auth/android/app/src/main/res/values/colors.xml`)

| Old | New |
|-----|-----|
| `#A75CFF` (ic_launcher_background) | `#E6C79C` |

### 3.5 Locker Android (`mobile/apps/locker/android/app/src/main/res/values/colors.xml`)

| Old | New |
|-----|-----|
| `#1071FF` (ic_launcher_background) | `#1D1F2F` |

### 3.6 Shared Components (`mobile/packages/ente_components/lib/theme/colors.dart`)

| Old (Ente Blue) | New (Parafilm Red) | Name |
|-----------------|---------------------|------|
| `Color.fromRGBO(16, 113, 255, 1)` | `Color.fromRGBO(247, 87, 87, 1)` | Blue default/stroke |
| `Color.fromRGBO(14, 95, 217, 1)` | `Color.fromRGBO(217, 69, 69, 1)` | Blue dark |
| `Color.fromRGBO(11, 76, 173, 1)` | `Color.fromRGBO(184, 58, 58, 1)` | Blue darker |
| `Color.fromRGBO(231, 239, 250, 1)` | `Color.fromRGBO(253, 232, 232, 1)` | Blue light |

### 3.7 Web Theme (`web/packages/base/components/utils/theme.ts`)

Check for any color hex values referencing the Ente green/purple/blue and replace with Parafilm palette.

---

## 4. PARAFILM BRAND COLOR PALETTE

| Name | HEX | RGB | Use |
|------|-----|-----|-----|
| Red Flame | `#f75757` | 247, 87, 87 | Primary accent |
| Champagne Gold | `#E6C79C` | 230, 199, 156 | Secondary (Auth) |
| Charcoal Blue | `#1D1F2F` | 29, 31, 47 | Dark backgrounds |
| Off White | `#FAFAFA` | 250, 250, 250 | Light backgrounds |
| Warm Gray | `#A8A8A8` | 168, 168, 168 | Neutral |

### Derived Colors

| Name | HEX | RGB | Derived from |
|------|-----|-----|--------------|
| Red Dark | `#D94545` | 217, 69, 69 | Red Flame darkened |
| Red Darker | `#B83A3A` | 184, 58, 58 | Red Flame more dark |
| Red Light | `#F96B6B` | 249, 107, 107 | Red Flame lightened |
| Red Lighter | `#FB8E8E` | 251, 142, 142 | Red Flame more light |
| Red Bg Light | `#FDE8E8` | 253, 232, 232 | Red Flame very light |
| Gold Dark | `#C9A87C` | 201, 168, 124 | Champagne darkened |
| Gold Light | `#D4B48A` | 212, 180, 138 | Champagne lightened |
| Gold Lighter | `#EDD5B5` | 237, 213, 181 | Champagne more light |
| Gold Bg Light | `#FFF8F0` | 255, 248, 240 | Champagne very light |

---

## 5. WORKFLOW SCRIPT (example)

```bash
#!/bin/bash
# rebrand.sh - Apply Parafilm branding after upstream sync

set -e

REPO_ROOT="$(git rev-parse --show-toplevel)"
BRAND_DIR="$REPO_ROOT/assets/branding"

# ---- 1. Text replacements (user-visible only) ----

# Safe sed replacements for app names
find "$REPO_ROOT" -type f \( -name "*.xml" -o -name "*.html" -o -name "*.txt" \
  -o -name "*.arb" -o -name "*.json" -o -name "*.yaml" -o -name "*.yml" \
  -o -name "*.dart" -o -name "*.go" -o -name "*.ts" -o -name "*.tsx" \
  -o -name "*.cc" -o -name "*.ps1" -o -name "*.sh" -o -name "*.desktop" \
  -o -name "*.plist" -o -name "*.xcconfig" -o -name "*.rc" -o -name "*.cpp" \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/package-lock.json" \
  -exec grep -l "Ente" {} \; | while read file; do
    # Replace user-visible brand names (careful patterns)
    sed -i \
      -e 's/Ente Photos/Parafilm Photos/g' \
      -e 's/Ente Auth/Parafilm Auth/g' \
      -e 's/Ente Locker/Parafilm Locker/g' \
      -e 's/Ente Paste/Parafilm Paste/g' \
      -e 's/Ente Debug/Parafilm Debug/g' \
      -e 's/Ente Dev/Parafilm Dev/g' \
      -e 's/Ente Technologies, Inc\./Parafilm Technologies, Inc./g' \
      -e 's/Team Ente/Team Parafilm/g' \
      -e 's/The Ente Team/The Parafilm Team/g' \
      -e 's/Ente Friends/Parafilm Friends/g' \
      -e 's/CEO of Ente/CEO of Parafilm/g' \
      -e 's/title="Ente"/title="Parafilm"/g' \
      -e 's/alt="Ente"/alt="Parafilm"/g' \
      "$file"
done

# Context-aware replacements (in specific files only)
# These need manual review or more targeted sed patterns:
# - "from Ente" → "from Parafilm" (CLI help text)
# - "your Ente account" → "your Parafilm account" (emails)
# - "the Ente app" → "the Parafilm app" (descriptions)
# - "on Ente" → "on Parafilm" (marketing text)
# - "trying Ente" → "trying Parafilm" (emails)
# - "New to Ente" → "New to Parafilm" (l10n)
# - "connect to Ente" → "connect to Parafilm" (l10n)

# ---- 2. Color replacements ----

# Photos colors.dart
sed -i \
  -e 's/Color.fromRGBO(29, 185, 84, 1)/Color.fromRGBO(247, 87, 87, 1)/g' \
  -e 's/Color.fromRGBO(0, 179, 60, 1)/Color.fromRGBO(217, 69, 69, 1)/g' \
  -e 's/Color.fromRGBO(38, 203, 95, 1)/Color.fromRGBO(249, 107, 107, 1)/g' \
  -e 's/Color.fromRGBO(1, 222, 77, 1)/Color.fromRGBO(251, 142, 142, 1)/g' \
  -e 's/Color.fromRGBO(8, 194, 37, 1)/Color.fromRGBO(247, 87, 87, 1)/g' \
  -e 's/Color.fromRGBO(6, 157, 30, 1)/Color.fromRGBO(217, 69, 69, 1)/g' \
  -e 's/Color.fromRGBO(5, 124, 24, 1)/Color.fromRGBO(184, 58, 58, 1)/g' \
  "$REPO_ROOT/mobile/apps/photos/lib/theme/colors.dart"

# Auth colors.dart
sed -i \
  -e 's/#8F33D6/#E6C79C/g' \
  -e 's/#722ED1/#C9A87C/g' \
  -e 's/#7A29C1/#D4B48A/g' \
  -e 's/#984DF4/#EDD5B5/g' \
  -e 's/#130D1B/#1D1F2F/g' \
  -e 's/#8232E1/#E6C79C/g' \
  -e 's/#B37FEB/#EDD5B5/g' \
  -e 's/#AE40E3/#E6C79C/g' \
  -e 's/#FCF5FF/#FFF8F0/g' \
  -e 's/#1C0F22/#1D1F2F/g' \
  "$REPO_ROOT/mobile/apps/auth/lib/theme/colors.dart"

# Shared components colors
sed -i \
  -e 's/Color.fromRGBO(16, 113, 255, 1)/Color.fromRGBO(247, 87, 87, 1)/g' \
  -e 's/Color.fromRGBO(14, 95, 217, 1)/Color.fromRGBO(217, 69, 69, 1)/g' \
  -e 's/Color.fromRGBO(11, 76, 173, 1)/Color.fromRGBO(184, 58, 58, 1)/g' \
  -e 's/Color.fromRGBO(231, 239, 250, 1)/Color.fromRGBO(253, 232, 232, 1)/g' \
  "$REPO_ROOT/mobile/packages/ente_components/lib/theme/colors.dart"

# Android colors.xml
sed -i 's/#08C225/#f75757/g' "$REPO_ROOT/mobile/apps/photos/android/app/src/main/res/values/colors.xml"
sed -i 's/#A75CFF/#E6C79C/g' "$REPO_ROOT/mobile/apps/auth/android/app/src/main/res/values/colors.xml"
sed -i 's/#1071FF/#1D1F2F/g' "$REPO_ROOT/mobile/apps/locker/android/app/src/main/res/values/colors.xml"

# ---- 3. Overwrite wordmark and logo component ----
cp "$BRAND_DIR/ente-wordmark.ts.parafilm" "$REPO_ROOT/web/packages/base/components/ente-wordmark.ts"
cp "$BRAND_DIR/EnteLogo.tsx.parafilm" "$REPO_ROOT/web/packages/base/components/EnteLogo.tsx"

# ---- 4. Generate and copy icons ----
pip install cairosvg Pillow 2>/dev/null

python3 << 'PYEOF'
import cairosvg
from PIL import Image

favi = "assets/branding/parafilm_favi.svg"
logo = "assets/branding/logo__black.svg"

# Web favicons
for app in ["accounts","albums","auth","cast","embed","ensu","locker","memories","paste","photos","share"]:
    cairosvg.svg2png(url=favi, write_to=f"web/apps/{app}/public/images/favicon.png", output_width=256, output_height=256)

# Memories favicon.ico
img = Image.open("web/apps/memories/public/images/favicon.png")
img.save("web/apps/memories/public/favicon.ico", format="ICO", sizes=[(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)])

# Desktop icons
cairosvg.svg2png(url=favi, write_to="desktop/build/icon.png", output_width=512, output_height=512)
cairosvg.svg2png(url=favi, write_to="desktop/build/window-icon.png", output_width=256, output_height=256)
for suffix, size in [("",16),("@2x",32),("@3x",48)]:
    cairosvg.svg2png(url=favi, write_to=f"desktop/build/taskbar-icon{suffix}.png", output_width=size, output_height=size)
    cairosvg.svg2png(url=favi, write_to=f"desktop/build/taskbar-icon-Template{suffix}.png", output_width=size, output_height=size)

# Android icons
sizes = {"mdpi":48,"hdpi":72,"xhdpi":96,"xxhdpi":144,"xxxhdpi":192}
for app in ["photos","auth","locker"]:
    for density, size in sizes.items():
        cairosvg.svg2png(url=favi, write_to=f"mobile/apps/{app}/android/app/src/main/res/mipmap-{density}/ic_launcher.png", output_width=size, output_height=size)

# iOS icons (locker)
import os
ios_dir = "mobile/apps/locker/ios/Runner/Assets.xcassets/AppIcon.appiconset"
if os.path.isdir(ios_dir):
    for f in os.listdir(ios_dir):
        if f.endswith(".png"):
            img = Image.open(os.path.join(ios_dir, f))
            w, h = img.size
            cairosvg.svg2png(url=favi, write_to=os.path.join(ios_dir, f), output_width=w, output_height=h)

# Paste logo
cairosvg.svg2png(url=logo, write_to="web/apps/paste/public/images/pastelogo.png", output_width=400, output_height=79)
PYEOF

echo "Rebrand complete!"
```

---

## 6. GITHUB ACTIONS WORKFLOW (example)

```yaml
name: Auto-Rebrand on Upstream Sync

on:
  # Trigger after upstream sync
  workflow_dispatch:
  schedule:
    - cron: '0 6 * * 1'  # Weekly Monday 6 AM

jobs:
  rebrand:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: main

      - name: Add upstream remote
        run: |
          git remote add upstream https://github.com/ente-io/ente.git || true
          git fetch upstream main

      - name: Merge upstream
        run: |
          git merge upstream/main --no-edit || {
            echo "Merge conflicts detected - manual resolution needed"
            exit 1
          }

      - name: Install dependencies
        run: pip install cairosvg Pillow

      - name: Run rebrand script
        run: bash ./rebrand.sh

      - name: Commit and push
        run: |
          git add -A
          git diff --cached --quiet || {
            git commit -m "Auto-rebrand: apply Parafilm branding after upstream sync"
            git push origin main
          }
```
