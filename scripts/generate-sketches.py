"""
Pencil Sketch Image Converter
Converts source images to B&W pencil sketch style matching NYC skyline reference.
Uses color dodge blending technique for realistic pencil drawing effect.
"""

import os
import numpy as np
from PIL import Image, ImageFilter, ImageOps, ImageEnhance

# Paths
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_DIR = os.path.join(PROJECT_ROOT, "Hero Image")
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "public", "images", "hero")

# Image mapping: source filename -> output name
IMAGES = {
    "Fotolia_257957753_Subscription_Monthly_M.jpg": "sketch-charts",
    "sony_a7c_ii_mirrorless_camera_1784820.jpg": "sketch-camera",
    "360_F_220709338_XERCHNrX6uCsIBFT3XEq8sgYeFqR10rO.jpg": "sketch-starburst",
    "Screenshot 2026-03-07 at 2.12.50 PM.png": "sketch-dataviz",
}

# Per-image tuning (blur_radius, contrast_boost, brightness_adjust, edge_strength)
TUNING = {
    "sketch-charts": {"blur": 21, "contrast": 1.4, "brightness": 1.1, "edge": 0.3},
    "sketch-camera": {"blur": 25, "contrast": 1.3, "brightness": 1.05, "edge": 0.4},
    "sketch-starburst": {"blur": 18, "contrast": 1.5, "brightness": 1.15, "edge": 0.25},
    "sketch-dataviz": {"blur": 22, "contrast": 1.4, "brightness": 1.1, "edge": 0.35},
}

MAX_SIZE = 800  # Max dimension for output


def color_dodge_blend(base, blend):
    """Color dodge blend mode - creates pencil sketch effect."""
    base = base.astype(np.float64)
    blend = blend.astype(np.float64)
    result = np.where(
        blend == 255,
        255,
        np.minimum(255, (base * 256) / (256 - blend))
    )
    return result.astype(np.uint8)


def create_pencil_sketch(image_path, output_name):
    """Convert an image to pencil sketch style."""
    params = TUNING.get(output_name, {"blur": 21, "contrast": 1.3, "brightness": 1.1, "edge": 0.3})

    print(f"  Processing {output_name}...")

    # Open and resize
    img = Image.open(image_path)
    img.thumbnail((MAX_SIZE, MAX_SIZE), Image.Resampling.LANCZOS)

    # Convert to grayscale
    gray = ImageOps.grayscale(img)

    # Invert
    inverted = ImageOps.invert(gray)

    # Gaussian blur the inverted image
    blurred = inverted.filter(ImageFilter.GaussianBlur(radius=params["blur"]))

    # Color dodge blend
    gray_arr = np.array(gray)
    blurred_arr = np.array(blurred)
    sketch_arr = color_dodge_blend(gray_arr, blurred_arr)
    sketch = Image.fromarray(sketch_arr, mode="L")

    # Edge detection layer for more defined lines
    edges = gray.filter(ImageFilter.FIND_EDGES)
    edges = ImageOps.invert(edges)
    edges_enhanced = ImageEnhance.Contrast(edges).enhance(2.0)

    # Blend sketch with edge layer
    edge_strength = params["edge"]
    sketch_arr = np.array(sketch).astype(np.float64)
    edges_arr = np.array(edges_enhanced).astype(np.float64)
    combined = sketch_arr * (1 - edge_strength) + edges_arr * edge_strength
    combined = np.clip(combined, 0, 255).astype(np.uint8)
    sketch = Image.fromarray(combined, mode="L")

    # Boost contrast
    sketch = ImageEnhance.Contrast(sketch).enhance(params["contrast"])

    # Adjust brightness (lighten for white paper look)
    sketch = ImageEnhance.Brightness(sketch).enhance(params["brightness"])

    # Add subtle paper texture (noise)
    sketch_arr = np.array(sketch).astype(np.float64)
    noise = np.random.normal(0, 3, sketch_arr.shape)
    sketch_arr = np.clip(sketch_arr + noise, 0, 255).astype(np.uint8)
    sketch = Image.fromarray(sketch_arr, mode="L")

    # Convert to RGB (white background aesthetic)
    sketch_rgb = Image.merge("RGB", [sketch, sketch, sketch])

    # Save as PNG
    output_path = os.path.join(OUTPUT_DIR, f"{output_name}.png")
    sketch_rgb.save(output_path, "PNG", optimize=True)

    file_size = os.path.getsize(output_path)
    print(f"    Saved: {output_path} ({sketch_rgb.size[0]}x{sketch_rgb.size[1]}, {file_size // 1024}KB)")

    return output_path


def copy_nyc_reference():
    """Copy and optimize the NYC skyline reference (already in sketch style)."""
    # The NYC skyline sketch was provided as the first user image
    # It's referenced but may not be in Hero Image/ - check common locations
    # For now, we'll check if there's a matching file
    possible_names = [
        "nyc-skyline.png", "nyc-skyline.jpg",
        "skyline.png", "skyline.jpg",
    ]

    # The NYC skyline was the first image the user shared - it might be the claude-color.png
    # or might have been provided directly. Let's check what's available.
    print("  Note: NYC skyline reference image should be placed manually as sketch-nyc.png")
    print("  (It's already in sketch style from the user's reference)")


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("Pencil Sketch Converter")
    print("=" * 50)
    print(f"Source: {SOURCE_DIR}")
    print(f"Output: {OUTPUT_DIR}")
    print()

    for source_file, output_name in IMAGES.items():
        source_path = os.path.join(SOURCE_DIR, source_file)
        if os.path.exists(source_path):
            create_pencil_sketch(source_path, output_name)
        else:
            print(f"  WARNING: Source not found: {source_path}")

    copy_nyc_reference()

    print()
    print("Done! Generated sketch images in public/images/hero/")


if __name__ == "__main__":
    main()
