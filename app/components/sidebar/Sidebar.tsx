// app/components/sidebar/Sidebar.tsx
import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full flex">
      <DesktopSidebar currentUser={currentUser!} /> {/*ignore hehe*/}
      <MobileFooter />
      <main className="lg:pl-20 h-full flex-grow">{children}</main>
    </div>
  );
}

export default Sidebar;
