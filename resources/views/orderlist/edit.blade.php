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
                            <form class="forms-sample" method="post" action="{{ route('order.update', $details->id) }}"
                                enctype="multipart/form-data">
                                @csrf
                                {{-- @method('PUT') --}}
                                <div class="form-group">
                                    <label for="exampleSelectGender">Order Status </label>
                                    <select class="form-control" id="exampleSelectGender" name="status">

                                        <option value="{{ $details->status }}"
                                            {{ $details->status == 'pending' ? 'selected' : '' }}>pending
                                        </option>
                                        <option value="{{ $details->status }}"
                                            {{ $details->status == 'processing' ? 'selected' : '' }}>Processing
                                        </option>
                                        <option value="{{ $details->status }}"
                                            {{ $details->status == 'shipped' ? 'selected' : '' }}>Shipped
                                        </option>
                                        <option value="{{ $details->status }}"
                                            {{ $details->status == 'delivered' ? 'selected' : '' }}>Delivered
                                        </option>
                                        <option value="{{ $details->status }}"
                                            {{ $details->status == 'cancelled' ? 'selected' : '' }}>Cancelled
                                        </option>
                                    </select>
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
