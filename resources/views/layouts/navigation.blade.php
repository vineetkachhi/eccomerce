<nav class="sidebar sidebar-offcanvas" id="sidebar">
    <div class="text-center sidebar-brand-wrapper d-flex align-items-center">
        <a class="sidebar-brand brand-logo" href="{{ route('dashboard') }}  "><img
                src="{{ asset('/images/ApniDukan.png') }}" alt="logo" /></a>
        <a class="sidebar-brand brand-logo-mini pl-4 pt-3" href="{{ route('dashboard') }}"><img
                src="{{ asset('/images/ApniDukan.png') }}" alt="logo" /></a>
    </div>
    <ul class="nav">
        <li class="nav-item nav-profile">
            <a href="#" class="nav-link">
                <div class="nav-profile-image">
                    <img src="{{ asset('assets/images/faces/face1.jpg') }}" alt="profile" />
                    <span class="login-status online"></span>
                    <!--change to offline or busy as needed-->
                </div>
                <div class="nav-profile-text d-flex flex-column pr-3">
                    <span class="font-weight-medium mb-2">{{ Auth::user()->name }}</span>
                    {{-- <span class="font-weight-normal">$8,753.00</span> --}}
                </div>
                {{-- <span class="badge badge-danger text-white ml-3 rounded">3</span> --}}
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="{{ route('dashboard') }}">
                <i class="mdi mdi-home menu-icon"></i>
                <span class="menu-title">Dashboard</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="{{ route('category.list') }}">
                <i class="mdi mdi-contacts menu-icon"></i>
                <span class="menu-title">Category</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="{{ route('product.index') }}">
                <i class="mdi mdi-contacts menu-icon"></i>
                <span class="menu-title">Product</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="{{ route('order.list') }}">
                <i class="mdi mdi-format-list-bulleted menu-icon"></i>
                <span class="menu-title">Order List</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="pages/charts/chartjs.html">
                <i class="mdi mdi-chart-bar menu-icon"></i>
                <span class="menu-title">Charts</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="pages/tables/basic-table.html">
                <i class="mdi mdi-table-large menu-icon"></i>
                <span class="menu-title">Tables</span>
            </a>
        </li>
        <li class="nav-item">
            <span class="nav-link" href="#">
                <span class="menu-title">Docs</span>
            </span>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="https://www.bootstrapdash.com/demo/breeze-free/documentation/documentation.html">
                <i class="mdi mdi-file-document-box menu-icon"></i>
                <span class="menu-title">Documentation</span>
            </a>
        </li>
        <li class="nav-item sidebar-actions">
            <div class="nav-link">
                <div class="mt-4">
                    <div class="border-none">
                        <p class="text-black">Notification</p>
                    </div>
                    <ul class="mt-4 pl-0">
                        {{-- <li>Sign Out</li> --}}
                        <li>
                            <a href="{{ route('logout') }}"
                                onclick="event.preventDefault(); this.closest('form').submit();">

                                {{ __('Sign Out') }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    </ul>
</nav>
