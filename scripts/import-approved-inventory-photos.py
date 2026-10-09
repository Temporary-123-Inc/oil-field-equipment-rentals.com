"""Import owner-supplied 2026-09-23 equipment photo bundles for reviewed models.

The resulting JSON is durable provenance consumed by build-location-image-manifest.py.
Only the source folders and explicit model-specific lists below are eligible; this
script never assigns unrelated, duplicate, or dimension-conflicting files.
"""
from __future__ import annotations

import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
STAGE = ROOT / "work" / "approved-equipment-images-20260923"
DEST = ROOT / "public" / "media" / "equipment-drive"
OUT = ROOT / "content" / "equipment-photo-import-20260923.json"

MODELS = [
    {
        "id": "owner-12ft-refrigerated-trailer",
        "name": "12 ft Refrigerated Trailer",
        "family": "refrigerated-trailer",
        "configuration": "owner-labelled-12ft-trailer-reference",
        "lengthFt": 12,
        "stalls": None,
        "priority": 1,
        "caption": "Owner-supplied 12 ft refrigerated-trailer reference set. Confirm the available trailer, cooling specification and temperature range with your quote.",
        "sourceEvidence": "Owner-provided ZIP folder labelled 12ft Refrigerated Trailer (Tier 1-4), visually reviewed; the source label establishes the model association, not operating specifications.",
    },
    {
        "id": "owner-26ft-bulk-mobile-kitchen",
        "name": "26 ft Bulk Mobile Kitchen",
        "family": "mobile-kitchen",
        "configuration": "bulk",
        "lengthFt": 26,
        "stalls": None,
        "priority": 1,
        "caption": "Owner-supplied 26 ft bulk mobile-kitchen reference set. Images show cooking, wash and preparation areas; verify the available appliance schedule, utilities and layout with your quote.",
        "sourceEvidence": "Owner-provided ZIP folder labelled '26ft baby bulk kitchen', visually reviewed as a commercial mobile kitchen. Owner-confirmed alias for the 26 ft Bulk Mobile Kitchen route; the images do not independently establish capacity or appliance specifications.",
    },
    {
        "id": "owner-24ft-mobile-laundry-trailer",
        "name": "24 ft Mobile Laundry Trailer",
        "family": "laundry-trailer",
        "configuration": "owner-labelled-24ft-trailer-reference",
        "lengthFt": 24,
        "stalls": None,
        "priority": 1,
        "caption": "Owner-supplied 24 ft mobile-laundry trailer interior references. The views show washer/dryer equipment; confirm machine count, utilities and the available layout with your quote.",
        "sourceEvidence": "Owner-provided ZIP folder labelled 24ft Mobile Laundry Trailer Rental, visually reviewed; length is based on the owner folder label, and equipment counts are not inferred.",
    },
    {
        "id": "owner-20ft-refrigerated-container",
        "name": "20 ft Refrigerated Container",
        "family": "refrigerated-container",
        "configuration": "owner-labelled-interior-reference",
        "lengthFt": 20,
        "stalls": None,
        "priority": 1,
        "caption": "Owner-supplied 20 ft refrigerated-container interior references. No exterior is pictured; confirm the container, cooling unit and temperature range with your quote.",
        "sourceEvidence": "Owner-provided ZIP folder labelled 20ft Refrigerated Container (Tier 1-4), visually reviewed. These interior references remain separate from refrigerated trailers and 40 ft containers.",
    },
    {
        "id": "owner-3-stall-1-ada-combination",
        "name": "Shower-Restroom Combination Trailer, 3 Stalls + 1 ADA",
        "family": "ada-combination",
        "configuration": "three-stalls-plus-one-ada",
        "lengthFt": None,
        "stalls": 3,
        "priority": 1,
        "caption": "Owner-supplied reference renders labelled 3 stalls plus 1 ADA. Confirm the actual unit, accessible-room layout, dimensions and available configuration with your quote.",
        "sourceEvidence": "Owner-provided ZIP folder labelled Luxury Shower-Restroom Combination Trailer (3 Stalls + 1 ADA), visually reviewed. Images are visual references and do not independently certify accessibility or exact dimensions.",
    },
    {
        "id": "owner-8-stall-1-ada-combination",
        "name": "Shower-Restroom Combination Trailer, 8 Stalls + 1 ADA",
        "family": "ada-combination",
        "configuration": "eight-stalls-plus-one-ada",
        "lengthFt": None,
        "stalls": 8,
        "priority": 1,
        "caption": "Owner-supplied reference renders labelled 8 stalls plus 1 ADA. Confirm the actual unit, accessible-room layout, dimensions and available configuration with your quote.",
        "sourceEvidence": "Owner-provided ZIP folder labelled Luxury Shower-Restroom Combination Trailer (8 Stalls + 1 ADA), visually reviewed. Images are visual references and do not independently certify accessibility or exact dimensions.",
    },
    {
        "id": "owner-restroom-only-reference",
        "name": "Restroom-Only Trailer Reference",
        "family": "restroom-trailer",
        "configuration": "owner-labelled-restroom-only-reference",
        "lengthFt": None,
        "stalls": None,
        "priority": 1,
        "caption": "Owner-supplied restroom-only trailer reference renders. They do not establish a particular model length, stall count or accessible layout; confirm the available configuration with your quote.",
        "sourceEvidence": "Owner-provided ZIP folder labelled Restroom Only, visually reviewed as restroom-only interiors. No dimension or availability claim is inferred.",
    },
    {
        "id": "owner-dining-hall-reference",
        "name": "Temporary Dining Hall",
        "family": "dining-hall",
        "configuration": "owner-labelled-dining-hall-reference",
        "lengthFt": None,
        "stalls": None,
        "priority": 1,
        "caption": "Owner-supplied illustrative dining-hall references. Confirm the structure, seating plan, utilities, furnishings and available rental or lease system with your quote.",
        "sourceEvidence": "Owner-provided ZIP folder labelled Dining Hall, visually reviewed as temporary dining-hall interiors; illustrations do not prove a deployed site or available furnishings.",
    },
    {
        "id": "owner-trailer-entry-stairs",
        "name": "Temporary Trailer Entry Stairs",
        "family": "trailer-access",
        "configuration": "owner-labelled-entry-stairs-reference",
        "lengthFt": None,
        "stalls": None,
        "priority": 1,
        "caption": "Owner-supplied illustrative temporary-trailer stair references. Confirm rise, landing, handrails and the available rental or lease access system with your quote.",
        "sourceEvidence": "Owner-provided ZIP folder labelled stairs, visually reviewed as wood entry stairs and steps at a mobile trailer; illustrations do not establish dimensions or safety compliance.",
    },
    {
        "id": "owner-generator-trailer-reference",
        "name": "Commercial Generator Trailer",
        "family": "generator-trailer",
        "configuration": "owner-labelled-generator-trailer-reference",
        "lengthFt": None,
        "stalls": None,
        "priority": 1,
        "caption": "Owner-supplied illustrative enclosed generator-trailer reference. Confirm output, electrical connections, fuel and servicing for the available rental or lease unit.",
        "sourceEvidence": "Owner-provided ZIP folder labelled Generator Trailer, visually reviewed as an enclosed towable generator unit; no output, fuel or connection claim is inferred.",
    },
]

SETS = [
    {
        "sourceFolder": "12ft Refrigerated Trailer (Tier 1-4)",
        "model": "owner-12ft-refrigerated-trailer",
        "family": "refrigerated-trailer",
        "targetDir": "refrigerated-trailers/12ft-refrigerated-trailer",
        "files": [
            ("12ft-refrigerated-trailer-interior-cooling-system.png", "interior", "Interior of a 12 ft refrigerated trailer with an overhead cooling unit"),
            ("12ft-refrigerated-trailer-stainless-steel-interior.png", "interior", "Stainless-lined interior of a 12 ft refrigerated trailer"),
            ("12ft-refrigerated-trailer-refrigeration-unit.png", "detail", "Cooling equipment inside the 12 ft refrigerated trailer"),
            ("12ft-refrigerated-trailer-exterior.png", "exterior", "Exterior of the owner-labelled 12 ft refrigerated trailer"),
        ],
    },
    {
        "sourceFolder": "26ft baby bulk kitchen",
        "model": "owner-26ft-bulk-mobile-kitchen",
        "family": "mobile-kitchen",
        "targetDir": "mobile-kitchens/26ft-bulk-mobile-kitchen",
        "files": [
            ("Codex Image Sep 23, 2026, 05_26_47 AM.png", "interior", "Stainless sink and preparation counter inside the 26 ft bulk mobile-kitchen reference"),
            ("Codex Image Sep 23, 2026, 05_27_52 AM.png", "interior", "Commercial range beneath a stainless extraction hood in the 26 ft bulk mobile kitchen"),
            ("Codex Image Sep 23, 2026, 05_27_59 AM.png", "interior", "Handwashing basin and stainless work counter inside the 26 ft bulk mobile kitchen"),
            ("Codex Image Sep 23, 2026, 05_28_05 AM.png", "interior", "Multi-compartment wash sink inside the 26 ft bulk mobile kitchen"),
            ("Codex Image Sep 23, 2026, 05_28_11 AM.png", "interior", "Commercial oven beneath the extraction hood in the 26 ft bulk mobile kitchen"),
            ("Codex Image Sep 23, 2026, 05_28_17 AM.png", "interior", "Refrigerator and stainless preparation counter inside the 26 ft bulk mobile kitchen"),
            ("Codex Image Sep 23, 2026, 05_28_25 AM.png", "interior", "Storage shelving and stainless counters inside the 26 ft bulk mobile kitchen"),
            ("Codex Image Sep 23, 2026, 05_28_31 AM.png", "interior", "Cooking and preparation aisle inside the 26 ft bulk mobile kitchen"),
            ("Codex Image Sep 23, 2026, 05_28_37 AM.png", "interior", "Commercial cooking line beneath the extraction hood in the 26 ft bulk mobile kitchen"),
            ("Codex Image Sep 23, 2026, 05_28_43 AM.png", "interior", "Stainless wash basin and preparation counter inside the 26 ft bulk mobile kitchen"),
            ("Codex Image Sep 23, 2026, 05_28_53 AM.png", "exterior", "Illustrative entrance and steps on the owner-labelled 26 ft bulk mobile kitchen"),
        ],
    },
    {
        "sourceFolder": "24ft Mobile Laundry Trailer Rental",
        "model": "owner-24ft-mobile-laundry-trailer",
        "family": "laundry-trailer",
        "targetDir": "laundry-trailers/24ft-mobile-laundry-trailer",
        "files": [
            ("24ft-commercial-laundry-trailer-washing-machines.png", "interior", "Commercial washing machines inside the owner-labelled 24 ft mobile laundry trailer"),
            ("24ft-mobile-laundry-trailer-washer-dryer-interior.png", "interior", "Washers and dryers inside the owner-labelled 24 ft mobile laundry trailer"),
            ("24ft-temporary-laundry-trailer-interior.png", "interior", "Laundry machines inside a temporary 24 ft laundry-trailer reference"),
        ],
    },
    {
        "sourceFolder": "20ft Refrigerated Container (Tier 1-4)",
        "model": "owner-20ft-refrigerated-container",
        "family": "refrigerated-container",
        "targetDir": "refrigerated-containers/20ft-refrigerated-container",
        "files": [
            ("20ft-refrigerated-trailer-interior.png", "interior", "Interior of the owner-labelled 20 ft refrigerated container"),
            ("20ft-refrigerated-trailer-interior-cooling-unit.png", "detail", "Cooling unit inside the owner-labelled 20 ft refrigerated container"),
            ("20ft-refrigerated-trailer-cold-storage-interior.png", "interior", "Cold-storage interior of the owner-labelled 20 ft refrigerated container"),
        ],
    },
    {
        "sourceFolder": "Luxury Shower-Restroom Combination Trailer (3 Stalls + 1 ADA)",
        "model": "owner-3-stall-1-ada-combination",
        "family": "ada-combination",
        "targetDir": "luxury-shower-restroom-combination-trailers/3-stalls-plus-1-ada",
        "files": [
            ("commercial-luxury-shower-restroom-trailer-interior.png", "interior", "Illustrative restroom interior from the owner-labelled 3-stall plus 1 ADA combination set"),
            ("commercial-shower-restroom-trailer-with-toilet-interior.png", "interior", "Illustrative toilet and wash area from the 3-stall plus 1 ADA combination set"),
            ("luxury-shower-restroom-trailer-interior.png", "interior", "Illustrative shower and restroom interior from the 3-stall plus 1 ADA combination set"),
            ("mobile-luxury-shower-restroom-trailer-bathroom.png", "interior", "Illustrative bathroom interior from the 3-stall plus 1 ADA combination set"),
            ("commercial-shower-restroom-trailer-rear-view.png", "exterior", "Illustrative rear view of a shower-restroom combination trailer in the 3-stall plus 1 ADA set"),
            ("mobile-shower-restroom-combination-trailer-side-view.png", "exterior", "Illustrative side view of a shower-restroom combination trailer in the 3-stall plus 1 ADA set"),
            ("temporary-luxury-shower-restroom-combination-trailer-exterior.png", "exterior", "Illustrative exterior of a shower-restroom combination trailer in the 3-stall plus 1 ADA set"),
            ("temporary-shower-restroom-trailer-exterior-doors.png", "exterior", "Illustrative entrance doors on a shower-restroom combination trailer in the 3-stall plus 1 ADA set"),
        ],
    },
    {
        "sourceFolder": "Luxury Shower-Restroom Combination Trailer (8 Stalls + 1 ADA)",
        "model": "owner-8-stall-1-ada-combination",
        "family": "ada-combination",
        "targetDir": "luxury-shower-restroom-combination-trailers/8-stalls-plus-1-ada",
        "files": [
            ("8-stall-ada-shower-restroom-trailer-interior.png", "interior", "Illustrative shower-room interior from the owner-labelled 8-stall plus 1 ADA combination set"),
            ("ada-shower-restroom-trailer-interior.png", "interior", "Illustrative accessible-room interior from the 8-stall plus 1 ADA combination set"),
            ("luxury-restroom-shower-trailer-sink-area.png", "interior", "Illustrative sink area from the 8-stall plus 1 ADA combination set"),
            ("luxury-shower-restroom-combination-trailer-interior.png", "interior", "Illustrative interior of the 8-stall plus 1 ADA shower-restroom combination"),
            ("luxury-shower-restroom-trailer-shower-stall.png", "interior", "Illustrative shower stall from the 8-stall plus 1 ADA combination set"),
            ("8-stall-ada-restroom-shower-trailer-entrance.png", "exterior", "Illustrative entry to the owner-labelled 8-stall plus 1 ADA combination trailer"),
            ("8-stall-ada-shower-restroom-trailer-exterior.png", "exterior", "Illustrative exterior of the 8-stall plus 1 ADA combination trailer"),
            ("8-stall-shower-restroom-combination-trailer-exterior.png", "exterior", "Illustrative exterior of the 8-stall shower-restroom combination trailer"),
            ("ada-accessible-shower-restroom-trailer.png", "exterior", "Illustrative access ramp and entrance on the ADA combination trailer"),
            ("luxury-shower-restroom-combination-trailer-side-view.png", "exterior", "Illustrative side view of the 8-stall plus 1 ADA combination trailer"),
            ("luxury-shower-restroom-trailer-rear-view.png", "exterior", "Illustrative rear view of the 8-stall plus 1 ADA combination trailer"),
        ],
    },
    {
        "sourceFolder": "Restroom Only",
        "model": "owner-restroom-only-reference",
        "family": "restroom-trailer",
        "targetDir": "restroom-trailers/restroom-only-reference",
        "files": [
            ("commercial-mobile-restroom-trailer-interior.png", "interior", "Restroom trailer interior reference with toilet and wash area from the restroom-only set"),
            ("commercial-mobile-restroom-trailer-sink-interior.png", "interior", "Restroom trailer sink and toilet area reference from the restroom-only set"),
            ("temporary-restroom-trailer-urinal-and-sink.png", "interior", "Restroom trailer urinal and sink reference from the restroom-only set"),
        ],
    },
    {
        "sourceFolder": "Dining Hall",
        "model": "owner-dining-hall-reference",
        "family": "dining-hall",
        "targetDir": "site-support/dining-hall",
        "files": [
            ("mobile-dining-hall-seating-area.png", "interior", "Illustrative dining-hall seating area with tables and chairs"),
            ("portable-dining-hall-interior.png", "interior", "Illustrative interior of a temporary portable dining hall"),
            ("temporary-dining-hall-with-tables-and-chairs.png", "interior", "Illustrative dining hall furnished with tables and chairs"),
        ],
    },
    {
        "sourceFolder": "stairs",
        "model": "owner-trailer-entry-stairs",
        "family": "trailer-access",
        "targetDir": "site-support/trailer-entry-stairs",
        "files": [
            ("commercial-mobile-trailer-wood-entry-stairs.png", "exterior", "Illustrative wood entry stairs and landing at a mobile trailer"),
            ("temporary-trailer-wood-entry-steps.png", "exterior", "Illustrative temporary wood steps at a trailer entrance"),
        ],
    },
    {
        "sourceFolder": "Generator Trailer",
        "model": "owner-generator-trailer-reference",
        "family": "generator-trailer",
        "targetDir": "site-support/generator-trailer",
        "files": [
            ("commercial-generator-trailer-rental.png", "exterior", "Illustrative enclosed commercial generator trailer at a site"),
        ],
    },
]


def main() -> None:
    if not STAGE.is_dir():
        raise SystemExit(f"Expected extracted owner photo ZIPs at {STAGE}")
    model_ids = {model["id"] for model in MODELS}
    rows: list[dict] = []
    seen_hashes: set[tuple[str, str]] = set()
    for group_number, group in enumerate(SETS, start=1):
        source_dirs = [p for p in STAGE.rglob(group["sourceFolder"]) if p.is_dir()]
        if len(source_dirs) != 1:
            raise ValueError(f"Expected one source directory for {group['sourceFolder']!r}; found {len(source_dirs)}")
        source_dir = source_dirs[0]
        for index, (filename, view, alt) in enumerate(group["files"], start=1):
            source = source_dir / filename
            if not source.is_file():
                raise FileNotFoundError(source)
            data = source.read_bytes()
            digest = hashlib.sha256(data).hexdigest()
            dedupe_key = (group["model"], digest)
            if dedupe_key in seen_hashes:
                raise ValueError(f"Duplicate bytes within one approved model: {source}")
            seen_hashes.add(dedupe_key)
            suffix = source.suffix.lower()
            target_name = f"{group['model']}-{index:02}{suffix}"
            relative = Path(group["targetDir"]) / target_name
            destination = DEST / relative
            destination.parent.mkdir(parents=True, exist_ok=True)
            if destination.exists() and hashlib.sha256(destination.read_bytes()).hexdigest() != digest:
                raise ValueError(f"Refusing to overwrite different media: {destination}")
            if not destination.exists():
                shutil.copy2(source, destination)
            with Image.open(destination) as image:
                image = ImageOps.exif_transpose(image)
                width, height = image.size
                rgb = image.convert("RGB")
                variants = []
                for bound in (480, 960):
                    out_width = min(bound, rgb.width)
                    out_height = round(rgb.height * out_width / rgb.width)
                    webp_name = f"{digest[:20]}-{bound}.webp"
                    webp_path = ROOT / "public" / "images" / "location-verified" / webp_name
                    webp_path.parent.mkdir(parents=True, exist_ok=True)
                    if not webp_path.exists():
                        rgb.resize((out_width, out_height), Image.Resampling.LANCZOS).save(webp_path, "WEBP", quality=86, method=4)
                    variants.append((f"/images/location-verified/{webp_name}", out_width, out_height))
            rows.append({
                "id": f"owner-20260923-{group_number:02}-{index:02}",
                "group": group["sourceFolder"],
                "model": group["model"],
                "family": group["family"],
                "original": f"/media/equipment-drive/{relative.as_posix()}",
                "sha256": digest,
                "bytes": len(data),
                "width": width,
                "height": height,
                "view": view,
                "status": "approved",
                "reason": "",
                "alt": alt,
                "reviewedVisually": True,
                "verificationBasis": "owner-supplied-zip-visually-reviewed",
                "evidence": f"Owner supplied the {group['sourceFolder']!r} ZIP folder; source image visually reviewed for the stated subject. The folder label is not treated as proof of unseen specifications.",
                "sourceFilename": filename,
                "src": variants[1][0],
                "srcSet": f"{variants[0][0]} {variants[0][1]}w, {variants[1][0]} {variants[1][1]}w",
                "thumbnail": variants[0][0],
                "displayOrder": index,
            })
    if len(model_ids) != len(MODELS):
        raise ValueError("Duplicate owner photo model id")
    payload = {
        "version": 1,
        "reviewedAt": "2026-09-23",
        "source": "Owner-provided product ZIPs attached in the 2026-09-23 TemporaryKitchenRental image-import request.",
        "models": MODELS,
        "images": rows,
    }
    OUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"models": len(MODELS), "images": len(rows), "manifest": str(OUT)}, indent=2))


if __name__ == "__main__":
    main()
