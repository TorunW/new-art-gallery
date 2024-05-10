import { server } from '../config/server';
import styles from '../styles/adminStyles/Admin.module.css';

function DeleteImage({
  id,
  setId,
  isOverlayVisible,
  setIsOverlayVisible,
  setIsLoading,
  setUpdate,
}) {
  async function onDeleteSubGalleryPicture() {
    setIsLoading(true);
    await fetch(`${server}/api/subgallery/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setUpdate(true);
    setIsOverlayVisible(false);
  }

  return (
    <div className={styles.overlay}>
      Är du säker på att du vill radera bilden?
      <button>
        <a onClick={() => onDeleteSubGalleryPicture()}>Ja!</a>
      </button>
      <button>
        <a onClick={() => setIsOverlayVisible(false)}>Nej</a>
      </button>
    </div>
  );
}

export default DeleteImage;
