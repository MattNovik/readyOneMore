const initFileUploadsHandler = () => {
  const VALID_EXT = [
    "gif",
    "jpg",
    "png",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "rar",
    "pdf",
    "zip",
    "ppt",
    "pptx",
    "txt",
    "cdw",
    "dwg",
    "7zip",
    "7z",
    "bmp",
    "css",
    "htm",
    'html',
    "iso",
    'psd',
    "sql",
  ];

  const MAX_FILES = 10;
  const MAX_SIZE_FILES = 31457280;

  $("#file-upload").on("change", function () {
    const dt = new DataTransfer();
    const input = $(this)[0];
    let files = input.files;
    let filesSize = 0;
    const list = $("#file-upload-list");
    list.empty();

    if (!!files.length) {
      if (files.length > MAX_FILES) {
        list.append($('<div class="form__files__item form__files-error">Не более 10 файлов</div>'));
      }
      filesSize = Array.from(files).reduce((currSumm, currSize) => currSumm + currSize.size, 0);
      if (filesSize <= MAX_SIZE_FILES) {
        Array.from(files).map((file, index) => {
          if (index < MAX_FILES) {
            if (Array.from(VALID_EXT).includes(file.name.split(".")[file.name.split(".").length - 1])) {
              list.append($('<div class="form__files__item">' + file.name + "</div>"));
              dt.items.add(file);
            } else {
              list.append(
                $(
                  '<div class="form__files__item form__files-error">' +
                    file.name +
                    "  <span class='form__files-error'>Ошибка формата файла!</span></div>"
                )
              );
            }
          }
        });
        files = dt.files;
        input.files = dt.files;
        console.log(input.files)
      } else {
        list.append($('<div class="form__files__item form__files-error">Размер файлов превышает 30 мб</div>'));
      }
    }
  });
};

export default initFileUploadsHandler;
