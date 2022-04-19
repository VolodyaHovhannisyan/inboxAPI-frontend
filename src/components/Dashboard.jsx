import useAuth from "../hooks/useAuth";
import InputPage from "../pages/InputPage";
import UserPage from "../pages/UserPage";
import UserService from "../services/user.service";

function Dashboard() {
  const { user } = useAuth();

  const { domain, setDomain } = UserService();

  return (
    <>
      {domain || user || (
        <section className="heading">
          <h1>Welcome to InboxAPI homepage</h1>
        </section>
      )}
      {user || <h2>Please Login or Register</h2>}
      {user && (domain || <InputPage setDomVal={setDomain} />)}
      {user && domain && <UserPage />}
    </>
  );
}

export default Dashboard;
