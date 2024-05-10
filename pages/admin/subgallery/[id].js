import { importDb } from '../../../config/db';
import ImageUploadForm from '../../../components/ImageUploadForm';
import FormStyles from '../../../styles/Form.module.css';

const subGalleryView = ({ subgallery }) => {
  async function onSave(res) {
    console.log(res, 'res');
  }

  return (
    <div className={FormStyles.edit}>
      <div>
        <ImageUploadForm
          type={'edit'}
          subgallery={subgallery}
          onSubmit={onSave}
        />
      </div>
    </div>
  );
};

export default subGalleryView;

export const getServerSideProps = async context => {
  const db = await importDb();
  const subgallery = await db.get('select * from subgallery where id = ?', [
    context.params.id,
  ]);
  return { props: { subgallery } };
};
