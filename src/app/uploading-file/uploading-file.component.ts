import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
    selector: 'app-uploading-file',
    templateUrl: './uploading-file.component.html'
})
export class UploadingFileComponent {
    fileData: File = null;
    previewUrl: any = [];
    url: any = [];
    uploadedFilePath: string = null;
    avatar: any = null;

    constructor(
        private http: HttpClient
    ) { }

    fileProgress(fileInput: any) {
        if (fileInput.target.files.length > 0) {
            Object.keys(fileInput.target.files).forEach((element, index) => {
                const check = this.url.find(i => fileInput.target.files[element].name === i);
                if (!check) {
                    this.url.push(fileInput.target.files[element].name);
                    this.fileData = fileInput.target.files[element];
                    const reader = new FileReader();
                    reader.readAsDataURL(fileInput.target.files[index]);
                    reader.onload = (event: any) => {
                        this.previewUrl.push({
                            name: fileInput.target.files[element].name,
                            base64: event.target.result
                        });
                    };

                }
            });
            const mimeType = this.fileData.type;
            if (mimeType.match(/image\/*/) == null) {
                return;
            }

        }
    }

    onClick = () => {
        console.log(this.previewUrl);
        console.log(this.url);
    }

    // uploading file avatar
    onChangeAvatar(event: any) {
        this.fileData = event.target.files[0];
        const mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = (ev: any) => {
            this.avatar = reader.result;
        };
    }

    onSubmit() {

    }
}
