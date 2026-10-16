#!/usr/bin/env python3
"""Launch the PRIVATE V18 Blackthorn server on a Windows laptop.

No secret story material is included in this public repository.
The user downloads the V18 ZIP separately from the private repository.
Extracts and persistent session tokens stay in LOCALAPPDATA, not in GitHub.
"""
from __future__ import annotations

import os
import shutil
import socket
import subprocess
import sys
import urllib.request
import zipfile
from pathlib import Path

ARCHIVE = "BLACKTHORN_PRIVATE_GAME_V18_CODES_AND_QR.zip"
PORT = 8765


def stop(reason: str) -> None:
    print("\n[Blackthorn] " + reason)
    raise SystemExit(1)


def local_network_ips() -> list[str]:
    addresses: set[str] = set()
    try:
        name = socket.gethostname()
        for item in socket.getaddrinfo(name, None, socket.AF_INET):
            address = item[4][0]
            if not address.startswith(("127.", "169.254.")):
                addresses.add(address)
    except OSError:
        pass
    return sorted(addresses)


def safe_extract(archive: Path, destination: Path) -> None:
    with zipfile.ZipFile(archive) as z:
        # Never allow a ZIP entry to escape the private runtime directory.
        base = destination.resolve()
        for entry in z.infolist():
            target = (base / entry.filename).resolve()
            if not target.is_relative_to(base):
                stop("Unsafe ZIP entry found; refusing extraction.")
        z.extractall(base)


def main() -> None:
    if sys.version_info < (3, 10):
        stop("Python 3.10 or newer is required.")
    launcher_dir = Path(__file__).resolve().parent
    archive = launcher_dir / ARCHIVE
    if not archive.is_file():
        stop(
            "Missing private V18 game archive.\n"
            "Download " + ARCHIVE + " from your PRIVATE GitHub repository:\n"
            "  FlorineDeSpiegeleer/Blackthorn-Server\n"
            "Place the ZIP beside START_BLACKTHORN_WINDOWS.bat.\n"
            "Do NOT upload the archive to the public Blackthorn repository."
        )

    appdata = Path(os.environ.get("LOCALAPPDATA", str(Path.home())))
    root = appdata / "BlackthornAcademy" / "V18"
    marker = root / ".archive_source.txt"
    fingerprint = f"{archive.stat().st_size}:{archive.stat().st_mtime_ns}"

    if not marker.is_file() or marker.read_text(encoding="utf-8") != fingerprint:
        if root.exists() and any(root.iterdir()):
            print("\nA previous local game installation already exists:")
            print(root)
            print("Its saved sessions and role tokens must not be overwritten.")
            print("If you intentionally want a fresh install, first back up this folder,")
            print("then move it elsewhere and start again.")
            stop("Cannot replace an existing private game installation automatically.")
        print("\nExtracting the confidential V18 files into your Windows profile...")
        root.mkdir(parents=True, exist_ok=True)
        safe_extract(archive, root)
        marker.write_text(fingerprint, encoding="utf-8")

    servers = list(root.rglob("server.py"))
    if len(servers) != 1:
        stop("Expected exactly one server.py in the private V18 archive.")
    game_dir = servers[0].parent
    print("\nPrivate game folder:", game_dir)

    requirements = game_dir / "requirements.txt"
    if requirements.exists():
        print("\nChecking/installing the original V18 Python dependencies...")
        command = [sys.executable, "-m", "pip", "install", "-r", str(requirements)]
        installed = subprocess.run(command, cwd=game_dir, check=False)
        if installed.returncode:
            stop("Python dependency installation failed. Review the output above.")

    print("\n" + "=" * 64)
    print(" BLACKTHORN ACADEMY — LOCAL WINDOWS GAME")
    print("=" * 64)
    print("Keep this command window OPEN for the entire game.")
    print("Laptop and all three phones must be on the SAME Wi-Fi network.")
    print("Local server address: http://127.0.0.1:" + str(PORT))
    for addr in local_network_ips():
        print("Possible phone address: http://" + addr + ":" + str(PORT))
    print("\nUse the confidential Director/QR invitation links printed by V18.")
    print("On phones, replace 127.0.0.1 with the laptop Wi-Fi IPv4 address")
    print("if necessary, preserving the full personal role URL and token.")
    print("Do NOT share Director links, codes or role tokens publicly.")
    print("If Windows Firewall asks, allow access on PRIVATE networks only.")
    print("=" * 64 + "\n")

    env = dict(os.environ)
    env["HOST"] = "0.0.0.0"
    env["PORT"] = str(PORT)
    env.pop("BLACKTHORN_HTTPS", None)  # LAN uses http://, not HTTPS
    try:
        subprocess.run([sys.executable, "server.py"], cwd=game_dir, env=env, check=False)
    except KeyboardInterrupt:
        print("\nBlackthorn server stopped.")


if __name__ == "__main__":
    main()
