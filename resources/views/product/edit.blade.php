<x-app-layout>
    <div class="main-panel">
        <div class="content-wrapper">
            <div class="page-header">
                <h3 class="page-title">Edit Product</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Forms</a></li>
                        <li class="breadcrumb-item active" aria-current="page"> Edit Product </li>
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
                            <form class="forms-sample" method="post"
                                action="{{ route('product.update', $product->id) }}" enctype="multipart/form-data">
                                @csrf
                                @method('PUT')
                                <div class="form-group">
                                    <label for="exampleSelectGender">Category</label>
                                    <select class="form-control" id="exampleSelectGender" name="category_id">
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}"
                                                {{ $product->category_id == $category->id ? 'selected' : '' }}>
                                                {{ $category->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputName1">Name</label>
                                    <input type="text" class="form-control" id="exampleInputName1" placeholder="Name"
                                        name="name" value="{{ $product->name }}">
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputEmail3">Slug</label>
                                    <input type="text" class="form-control" placeholder="Slug" name="slug"
                                        value="{{ $product->slug }}">
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputCity1">Price</label>
                                    <input type="text" class="form-control" id="exampleInputCity1"
                                        placeholder="Price" name="price" value="{{ $product->price }}">
                                </div>

                                <div class="form-group">
                                    <label for="exampleTextarea1">Textarea</label>
                                    <textarea class="form-control" id="exampleTextarea1" rows="4" name="description">{{ $product->description }}</textarea>
                                </div>

                                <div>
                                    <label>Image</label>
                                    <input type="file" name="image" class="file-upload-default">
                                    @if ($product->image)
                                        <img src="{{ asset('images/' . $product->image) }}" alt="Product Image"
                                            class="img-thumbnail mt-2" width="150">
                                    @endif
                                </div>

                                <div>
                                    <label>Status</label>
                                    <div class="form-check form-check-flat form-check-primary">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" name="status"
                                                id="statusActive" value="active"
                                                {{ $product->status == 'active' ? 'checked' : '' }}>
                                            Active
                                        </label>
                                    </div>
                                    <div class="form-check form-check-flat form-check-primary">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" name="status"
                                                id="statusInactive" value="inactive"
                                                {{ $product->status == 'inactive' ? 'checked' : '' }}>
                                            Inactive
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary mr-2">Update Product</button>
                                <button type="button" class="btn btn-light">Cancel</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
