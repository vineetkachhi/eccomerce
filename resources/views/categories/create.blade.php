<x-app-layout>
    <div class="main-panel">
        <div class="content-wrapper">
            <div class="page-header">
                <h3 class="page-title">Create Category</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="{{ route('category.list') }}">Categories List</a></li>
                        <li class="breadcrumb-item active" aria-current="page"> Create Category </li>
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
                            <form class="forms-sample" method="POST" action="{{ route('category.store') }}">
                                @csrf
                                <div class="form-group">
                                    <label for="exampleInputName1">Name</label>
                                    <input type="text" name="name" class="form-control" id="exampleInputName1"
                                        placeholder="Name">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputName1">Slug</label>
                                    <input type="text" name="slug" class="form-control" id="exampleInputName1"
                                        placeholder="Slug">
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputEmail3">Status</label>
                                    <select class="form-control form-control-lg" name="status"
                                        id="exampleFormControlSelect2">
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
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
