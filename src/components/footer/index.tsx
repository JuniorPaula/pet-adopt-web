export function Footer() {
  return (
    <footer className="bg-slate-100 text-black text-center p-4">
      <p className="text-sm">
        &copy; { new Date().getFullYear() } - PetAdopt - Todos os direitos reservados.
      </p>
    </footer>
  );
}