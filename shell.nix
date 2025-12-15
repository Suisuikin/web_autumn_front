{ pkgs ? import <nixpkgs> {} }:

let
  libraries = with pkgs; [
    webkitgtk_4_1
    gtk3
    cairo
    gdk-pixbuf
    glib
    dbus
    openssl_3
    librsvg
    libsoup_3
  ];

  packages = with pkgs; [
    curl
    wget
    pkg-config
    dbus
    openssl_3
    glib
    gtk3
    libsoup_3
    webkitgtk_4_1
    librsvg

    nodejs
    cargo
    rustc
    rust-analyzer
  ];
in
pkgs.mkShell {
  buildInputs = packages;

  shellHook = ''
    export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath libraries}:$LD_LIBRARY_PATH
    export XDG_DATA_DIRS=${pkgs.gsettings-desktop-schemas}/share/gsettings-schemas/${pkgs.gsettings-desktop-schemas.name}:${pkgs.gtk3}/share/gsettings-schemas/${pkgs.gtk3.name}:$XDG_DATA_DIRS
  '';
}
