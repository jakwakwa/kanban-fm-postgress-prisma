const KanbanMainPage = async () => {
  const isEmpty = true;

  // ? Main Page after initial sign up
  // TODO: Refactor task: Children is in Sidenav, invesitgate why, and should it not be here
  return (
    <>
      {isEmpty && (
        <div className="h-full flex flex-col items-center justify-center align-middle">
          <div className="mb-4">Pick a board to get started.</div>
        </div>
      )}
    </>
  );
};

export default KanbanMainPage;
