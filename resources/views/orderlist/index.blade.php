<x-app-layout>
    <div class="main-panel">
        <div class="content-wrapper">
            <div class="page-header">
                <h3 class="page-title">Order List</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active" aria-current="page"> Order List </li>
                    </ol>
                </nav>
            </div>
            <div class="row">

                <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            @if (session('success'))
                                <div class="alert alert-success alert-dismissible fade show" role="alert">
                                    {{ session('success') }}

                                    <button type="button" class="close" data-dismiss="alert">
                                        <span>&times;</span>
                                    </button>
                                </div>
                            @endif
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @if ($orderlist->isEmpty())
                                            <tr>
                                                <td colspan="6" class="text-center">No products found.</td>
                                            </tr>
                                        @endif
                                        @foreach ($orderlist as $list)
                                            <tr>
                                                <td>{{ $loop->iteration }}</td>

                                                <td>{{ $list->user->name }}</td>
                                                <td>₹ {{ number_format($list->total_amount, 2) }}</td>


                                                <td>
                                                    @if ($list->status == 'pending')
                                                        <span class="btn btn-inverse-info btn-fw">Pending</span>
                                                    @elseif ($list->status == 'processing')
                                                        <span class="btn btn-secondary btn-fw">Processing</span>
                                                    @elseif($list->status == 'shipped')
                                                        <span class="btn btn-warning btn-fw">Shipped</span>
                                                    @elseif($list->status == 'delivered')
                                                        <span class="btn btn-info btn-fw">Delivered</span>
                                                    @else
                                                        <span class="btn btn-danger btn-fw">Cancelled</span>
                                                    @endif
                                                </td>
                                                <td>
                                                    <a href="{{ route('order.edit', $list->id) }}"
                                                        class="btn btn-dark btn-icon-text">

                                                        <i class="fa fa-pencil"></i> Status Update
                                                    </a>

                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                                {{ $orderlist->links() }}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</x-app-layout>
