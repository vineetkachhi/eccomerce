<x-app-layout>
    <div class="main-panel">
        <div class="content-wrapper">
            <div class="page-header">
                <h3 class="page-title">Create Product</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Forms</a></li>
                        <li class="breadcrumb-item active" aria-current="page"> Create Product </li>
                    </ol>
                </nav>
            </div>
            <div class="row">
                <div class="col-12 d-flex">
                    <div class="card w-100">
                        <div class="card-body">
                            @if (session('success'))
                                <div class="alert alert-success alert-dismissible fade show" role="alert">
                                    {{ session('success') }}

                                    <button type="button" class="close" data-dismiss="alert">
                                        <span>&times;</span>
                                    </button>
                                </div>
                            @endif

                            @if ($errors->any())
                                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <ul class="mb-0">
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>

                                    <button type="button" class="close" data-dismiss="alert">
                                        <span>&times;</span>
                                    </button>
                                </div>
                            @endif
                            <form class="forms-sample" method="post" action="{{ route('product.store') }}"
                                enctype="multipart/form-data">
                                @csrf
                                <div class="form-group">
                                    <label for="exampleSelectGender">Category</label>
                                    <select class="form-control" id="exampleSelectGender" name="category_id">
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}">{{ $category->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputName1">Name</label>
                                    <input type="text" class="form-control" id="exampleInputName1" placeholder="Name"
                                        name="name">
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputEmail3">Slug</label>
                                    <input type="text" class="form-control" placeholder="Slug" name="slug">
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputCity1">Price</label>
                                    <input type="text" class="form-control" id="exampleInputCity1"
                                        placeholder="Price" name="price">
                                </div>

                                <div class="form-group">
                                    <label for="exampleTextarea1">Textarea</label>
                                    <textarea class="form-control" id="exampleTextarea1" rows="4" name="description"></textarea>
                                </div>

                                <div>
                                    <label>Image</label>
                                    <input type="file" name="image" class="file-upload-default">

                                </div>

                                <div>
                                    <label>Status</label>
                                    <div class="form-check form-check-flat form-check-primary">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" name="status"
                                                id="statusActive" value="active" checked>
                                            Active
                                        </label>
                                    </div>
                                    <div class="form-check form-check-flat form-check-primary">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" name="status"
                                                id="statusInactive" value="inactive">
                                            Inactive
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                <button type="button" class="btn btn-light">Cancel</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
