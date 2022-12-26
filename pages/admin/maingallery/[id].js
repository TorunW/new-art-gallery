import { importDb } from '../../../config/db';
import MainGalleryForm from '../../../components/MainGalleryForm';

const mainGalleryView = ({ maingallery }) => {
  async function onSave(res) {
    console.log(res, 'res');
  }

  return (
    <div>
      <div>
        <MainGalleryForm
          type={'edit'}
          maingallery={maingallery}
          onSubmit={onSave}
        />
      </div>
    </div>
  );
};

export default mainGalleryView;

export const getServerSideProps = async context => {
  const db = await importDb();
  const maingallery = await db.get('select * from maingallery where id = ?', [
    context.params.id,
  ]);
  return { props: { maingallery } };
};
