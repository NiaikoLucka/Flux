import { useAccount } from "../../queries/account.queries";
import { useAppStore } from "../../stores/app.store";
import { useSession} from "../../hooks/use-session"

const AccountsTest = () => {
  const {data: session} = useSession()
  const userId = session?.user.id

  const workspaceId = useAppStore((state) =>
    userId ? state.selectedWorkspaceByUser[userId] : null,
  );

  console.log("from AccountTest : ", workspaceId);

  const { data: accounts, isPending, isError } = useAccount(workspaceId);
  console.log({
    accounts,
    isPending,
    isError,
  });

  if (isPending) {
    return <p>Chargement...</p>;
  }

  if (isError) {
    return <p>Erreur lors du chargement.</p>;
  }

  return <pre>{JSON.stringify(accounts, null, 2)}</pre>;
};

export default AccountsTest;
