import AcceptButton from "../buttons/accept-button";
import AddColumnButton from "../buttons/add-column-button";
import CancelButton from "../buttons/cancel-button";
import { 
  commonClasses 
} from '@/components/kanban/kanban-grid-styles';

interface AddColumnFormProps {
  darkMode: boolean;
  addingColumn: boolean;
  newColumnName: string;
  setNewColumnName: (value: string) => void;
  handleAddColumn: () => void;
  addColumnIsLoading: boolean;
  setAddingColumn: (value: boolean) => void;
}

const AddColumnForm = ({
  darkMode,
  addingColumn,
  newColumnName,
  setNewColumnName,
  handleAddColumn,
  addColumnIsLoading,
  setAddingColumn,
}: AddColumnFormProps) => {
  return (
    <div className={`${commonClasses.flex} ${commonClasses.overflow} ${darkMode ? 'bg-[#141517]' : 'bg-[#f3f4fd22]'}  p-3 w-[100%] mx-auto`}>
      {addingColumn ? (
        <div className="flex gap-[5px]">
          <input
            className={`${
              darkMode 
                ? commonClasses.input.dark 
                : 'hover:shadow-slate-200'
            } ${commonClasses.input.base}`}
            type="text"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            placeholder="New column name"
          />
          <AcceptButton 
            darkMode={darkMode}
            onClick={handleAddColumn}
            disabled={!newColumnName || addColumnIsLoading}
            isLoading={addColumnIsLoading}
          />
          <CancelButton 
            darkMode={darkMode}
            onCancel={() => {
              setAddingColumn(false);
              setNewColumnName('');
            }}
          />
        </div>
      ) : (
        <AddColumnButton setAddingColumn={setAddingColumn} />
      )}
    </div>
  );
};

export default AddColumnForm; 