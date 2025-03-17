{
  description = "Web development environment for Next.js with bun and pnpm";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
            yarn
            bun
            pnpm
          ];

          shellHook = ''
            export PATH=$PATH:${pkgs.nodejs}/bin:${pkgs.yarn}/bin:${pkgs.bun}/bin:${pkgs.pnpm}/bin
            echo "Welcome to the web development environment with bun and pnpm!"
          '';
        };
      }
    );
}
