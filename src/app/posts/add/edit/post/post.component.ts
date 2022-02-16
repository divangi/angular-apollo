import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  postForm: FormGroup;
  postId: string;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(''),
      body: new FormControl(''),
    });
    if (this.route.snapshot.params.id) {
      this.postId = this.route.snapshot.params.id;
      this.getPostDetail(this.postId);
    }
  }

  getPostDetail(id: string) {
    console.log('id ====>', id);
  }

  onSubmit() {
    console.log('on submit function called ===>', this.postForm.value);
    this.apollo
      .mutate({
        mutation: Add_Post,
        variables: {
          input: {
            title: this.postForm.value.title,
            body: this.postForm.value.body,
          },
        },
      })
      .subscribe(({ data }) => {
        console.log('data, data.Save ====>', data, data['createPost']);
      });
  }
}

// Queries

// add post
const Add_Post = gql`
  mutation ($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

// get post by id
const Get_Post = gql`
  query {
    post(id: $id) {
      id
      title
      body
    }
  }
`;
