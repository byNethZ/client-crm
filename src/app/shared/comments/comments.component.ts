import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentChange, SelectionChange } from 'ngx-quill';
import { Comment } from 'src/app/models/comment.interface';
import { CommentsService } from 'src/app/services/comments.service';
import { CustomerService } from 'src/app/services/customer.service';
import Utils from 'src/utils/Utils';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  public utils = new Utils();
  public htmlText: string = '';
  public comments: Comment[] = [];
  public idUser: number = parseInt(localStorage.getItem('id')!);
  public newComment: Comment;

  public quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['code-block'],
        //  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        //  [{ 'direction': 'rtl' }],                         // text direction

        //  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ align: [] }],

        //  ['clean'],                                         // remove formatting button

        //  ['link'],
        ['link', 'image', 'video'],
      ],
    },
  };

  @Input() idCustomer: number = 0;
  @Input() token: string = '';
  @Input() status: number | null = null;

  constructor(
    private _commentsService: CommentsService,
    private _customerService: CustomerService,
    private _modalService: NgbModal,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments(){
    //console.log(this.idCustomer);
    this._commentsService.getComments(this.token, this.idCustomer).subscribe({
      next: (response) => {
        this.comments = response.comments;
        //console.log(this.comments);
      },
      error: ( error ) => console.log( error )
    })

  }

  onSelectionChanged = (event: SelectionChange) => {
    if(event.oldRange == null) {
      this.onFocus();
    }
    if(event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged = (event: ContentChange) => {
    // console.log(event.html);
  }

  onFocus = () => {
    console.log("On Focus");
  }
  onBlur = () => {
    console.log("Blurred");
  }

  save(){
    this.newComment = {
      author_id: this.idUser,
      customer_id: this.idCustomer,
      comment: this.htmlText,

    }

    this._commentsService.saveComment(this.token, this.newComment).subscribe({
      next: () => {
        this.getComments();
        this.htmlText = '';
      },
      error: ( error ) => console.log(error)
    })

    if(this.status) this.changeStatus(this.status)
  }

  changeStatus(status: number){

    this._customerService.changeStatus(this.idCustomer, status, this.token!).subscribe(
      response => {
        this.reloadCurrentRoute();
        this._modalService.dismissAll();
        //console.log(response)

      },
      error => {
        console.log(error);

      }
    )

  }

  reloadCurrentRoute() {
    const currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }
}
