@props(['active'])

@php
    $classes = $active ?? false ? 'dropdown-item ' : 'dropdown-item';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }}>
    <i class="mdi mdi-cached mr-2 text-success"></i> {{ $slot }}
</a>
